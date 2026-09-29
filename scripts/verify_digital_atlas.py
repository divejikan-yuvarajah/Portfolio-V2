"""Task 14B browser QA against an isolated Edge/Chromium CDP port.

Requires locally available websocket-client; no site runtime dependency.
Serve the repo at localhost:8765, launch an isolated headless browser on port
9222, then run this script. --baseline captures the original static cover.
"""
import argparse
import base64
import json
from pathlib import Path
import time
from urllib.request import urlopen

import websocket


class Browser:
    def __init__(self):
        targets = json.load(urlopen('http://127.0.0.1:9222/json'))
        target = next(t for t in targets if t['type'] == 'page' and '127.0.0.1:8765' in t['url'])
        self.socket = websocket.create_connection(target['webSocketDebuggerUrl'], origin='http://localhost:9222')
        self.sequence = 0

    def call(self, method, **params):
        self.sequence += 1
        self.socket.send(json.dumps({'id': self.sequence, 'method': method, 'params': params}))
        while True:
            response = json.loads(self.socket.recv())
            if response.get('id') == self.sequence:
                if 'error' in response:
                    raise RuntimeError(response['error'])
                return response.get('result', {})

    def evaluate(self, expression):
        result = self.call('Runtime.evaluate', expression=expression, returnByValue=True, awaitPromise=True)
        if 'exceptionDetails' in result:
            raise RuntimeError(result['exceptionDetails'])
        return result['result'].get('value')

    def viewport(self, width, height=1000):
        self.call('Emulation.setDeviceMetricsOverride', width=width, height=height, deviceScaleFactor=1, mobile=False)

    def navigate(self, path=''):
        self.call('Page.navigate', url='http://127.0.0.1:8765/' + path)
        time.sleep(1.5)
        self.evaluate('document.fonts.ready.then(() => true)')

    def screenshot(self, path):
        data = self.call('Page.captureScreenshot', format='png', captureBeyondViewport=False)
        path.write_bytes(base64.b64decode(data['data']))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--baseline', action='store_true')
    args = parser.parse_args()
    output = Path('docs/qa/task14b')
    output.mkdir(parents=True, exist_ok=True)
    browser = Browser()
    browser.call('Page.enable')
    browser.call('Network.enable')
    browser.call('Network.setCacheDisabled', cacheDisabled=True)
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
    results = []
    widths = [1440, 375] if args.baseline else [320, 375, 390, 768, 1024, 1280, 1440]
    for width in widths:
        browser.viewport(width)
        browser.navigate()
        metrics = browser.evaluate('({width: innerWidth, clientWidth: document.documentElement.clientWidth, pageWidth: document.documentElement.scrollWidth, h1: document.querySelectorAll("h1").length, projects: document.querySelectorAll("[data-project-card]").length})')
        if not args.baseline:
            assert metrics['pageWidth'] <= metrics['clientWidth'], metrics
            assert metrics['h1'] == 1 and metrics['projects'] == 17, metrics
        results.append(metrics)
        if not args.baseline or width in [375, 1440]:
            browser.screenshot(output / f'{"before" if args.baseline else "after"}-{width}.png')
    if args.baseline:
        print(json.dumps(results))
        return

    for section in ['projects', 'achievements', 'contact']:
        browser.evaluate(f'document.querySelector("#{section}").scrollIntoView()')
        time.sleep(0.3)
        browser.screenshot(output / f'after-{section}-1440.png')
    for target in ['work-flowpilot-ai', 'work-cortex', 'skills', 'education']:
        browser.evaluate(f'document.querySelector("#{target}").scrollIntoView({{behavior:"instant"}})')
        time.sleep(0.2)
        browser.screenshot(output / f'after-{target}-1440.png')

    for width, height in [(844, 390), (1280, 600), (720, 500)]:
        browser.viewport(width, height)
        browser.navigate()
        assert browser.evaluate('document.documentElement.scrollWidth <= document.documentElement.clientWidth')
        assert browser.evaluate('getComputedStyle(document.querySelector(".project-illustration")).position') != 'sticky'
    results.append({'additionalLayouts': '844x390 landscape, 1280x600 short desktop, 720x500 CSS viewport (200%-equivalent layout)'})
    browser.viewport(1440)
    browser.navigate()

    # Native filters retain their expected visibility/count and meaningful text.
    browser.evaluate('document.querySelector("[data-filter=finance]").click()')
    assert browser.evaluate('document.querySelectorAll("[data-project-card]:not([hidden])").length') == 1
    browser.evaluate('document.querySelector("[data-filter=all]").click()')
    assert browser.evaluate('document.querySelectorAll("[data-project-card]:not([hidden])").length') == 17

    # Required-field feedback, without opening a mail client or sending a message.
    browser.evaluate('document.querySelector("[data-contact-form]").requestSubmit()')
    assert browser.evaluate('document.querySelector("#contact-name").getAttribute("aria-invalid")') == 'true'

    for width in [375, 1440]:
        browser.viewport(width)
        for slug in ['flowpilot-ai', 'cortex', 'mediguardian-ai', 'infraos']:
            browser.navigate(f'projects/{slug}/')
            assert browser.evaluate('document.querySelectorAll("h1").length') == 1
            assert browser.evaluate('document.documentElement.scrollWidth <= innerWidth')

    browser.viewport(375)
    browser.navigate()
    browser.evaluate('document.querySelector("#mobile-menu").click()')
    assert browser.evaluate('document.querySelector("#mobile-menu").getAttribute("aria-expanded")') == 'true'
    browser.call('Input.dispatchKeyEvent', type='keyDown', key='Escape', code='Escape', windowsVirtualKeyCode=27)
    assert browser.evaluate('document.querySelector("#mobile-menu").getAttribute("aria-expanded")') == 'false'

    browser.call('Emulation.setScriptExecutionDisabled', value=True)
    browser.navigate()
    assert browser.evaluate('document.querySelector(".hero-title").getBoundingClientRect().height > 0')
    assert browser.evaluate('document.querySelectorAll("[data-project-card]:not([hidden])").length') == 17
    browser.call('Emulation.setScriptExecutionDisabled', value=False)

    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'no-preference'}])
    for blocked in [['*gsap.min.js'], ['*ScrollTrigger.min.js'], ['*unpkg.com/three*']]:
        browser.call('Network.setBlockedURLs', urls=blocked)
        browser.navigate()
        assert browser.evaluate('document.querySelector("[data-contact-form]").hidden') is False
        assert browser.evaluate('document.querySelector(".projects-filter").hidden') is False
        assert browser.evaluate('document.querySelector(".hero-title").getBoundingClientRect().height > 0')
    browser.call('Network.setBlockedURLs', urls=[])
    browser.viewport(1440)
    browser.navigate()
    time.sleep(2)
    loaded = browser.evaluate('({gsap: window.gsap?.version, scrollTrigger: window.ScrollTrigger?.version, triggers: window.ScrollTrigger?.getAll().length})')
    assert loaded.get('gsap') == '3.15.0' and loaded.get('scrollTrigger') == '3.15.0', loaded
    assert browser.evaluate('ScrollTrigger.getAll().filter(t => t.vars.scrub).length') == 4
    browser.evaluate('import("./js/motion.js").then(m => { m.initMotion(); m.initMotion(); })')
    assert browser.evaluate('ScrollTrigger.getAll().length') == loaded['triggers']
    browser.viewport(375)
    time.sleep(0.4)
    assert browser.evaluate('ScrollTrigger.getAll().filter(t => t.vars.scrub).length') == 0
    browser.viewport(1440)
    time.sleep(0.4)
    assert browser.evaluate('ScrollTrigger.getAll().filter(t => t.vars.scrub).length') == 4
    assert browser.evaluate('document.querySelectorAll("script[data-motion-asset]").length') == 2
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
    time.sleep(0.3)
    assert browser.evaluate('window.ScrollTrigger.getAll().length') == 0
    browser.call('HeapProfiler.collectGarbage')
    listeners_before = browser.call('Memory.getDOMCounters')['jsEventListeners']
    for _ in range(4):
        browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'no-preference'}])
        time.sleep(0.15)
        assert browser.evaluate('ScrollTrigger.getAll().length') == 4
        browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
        time.sleep(0.15)
        assert browser.evaluate('ScrollTrigger.getAll().length') == 0
    browser.call('HeapProfiler.collectGarbage')
    listeners_after = browser.call('Memory.getDOMCounters')['jsEventListeners']
    assert listeners_after <= listeners_before, (listeners_before, listeners_after)
    results.append({'preferenceStress': 'four restore/reduce cycles; 4/0 triggers', 'listenersBefore': listeners_before, 'listenersAfter': listeners_after})
    # Keyboard focus remains in normal flow; no animated link is moved off screen.
    browser.navigate()
    browser.evaluate('document.activeElement.blur(); window.scrollTo({top:0,behavior:"instant"})')
    visited = []
    for _ in range(150):
        browser.call('Input.dispatchKeyEvent', type='keyDown', key='Tab', code='Tab', windowsVirtualKeyCode=9)
        browser.call('Input.dispatchKeyEvent', type='keyUp', key='Tab', code='Tab', windowsVirtualKeyCode=9)
        item = browser.evaluate('(() => { const e=document.activeElement,r=e.getBoundingClientRect(); return {id:e.id,href:e.getAttribute("href"),tag:e.tagName,visible:e.matches(".skip-link") || (r.bottom>(e.closest(".site-header")?0:72) && r.top<innerHeight && r.right>0 && r.left<innerWidth)}; })()')
        assert item['visible'], item
        visited.append(item)
        if item['id'] == 'contact-message':
            break
    assert any(item['id'] == 'contact-message' for item in visited)
    assert all(any(item['href'] == f'projects/{slug}/' for item in visited) for slug in ['flowpilot-ai','cortex','mediguardian-ai','infraos'])
    results.append({'keyboardStops': len(visited), 'keyboard': 'Tab journey reached every flagship case-study link and all contact inputs without offscreen focus'})
    # Back/Forward is real history traversal. Record whether this browser used BFCache.
    browser.evaluate('window.__atlasRestored=false; addEventListener("pageshow",e=>window.__atlasRestored=e.persisted)')
    browser.navigate('projects/flowpilot-ai/')
    history = browser.call('Page.getNavigationHistory')
    browser.call('Page.navigateToHistoryEntry', entryId=history['entries'][history['currentIndex']-1]['id'])
    time.sleep(1.5)
    results.append({'historyReturnedHome': browser.evaluate('!!document.querySelector("#hero")'), 'bfcacheUsed': browser.evaluate('window.__atlasRestored === true')})
    for ident in ['hero', 'about', 'skills', 'projects', 'achievements', 'experience', 'community', 'education', 'certifications', 'contact']:
        browser.evaluate(f'location.hash="{ident}"')
        time.sleep(0.1)
        assert browser.evaluate(f'document.getElementById("{ident}").getBoundingClientRect().top >= document.querySelector(".navbar").getBoundingClientRect().bottom - 1'), ident
    results.append({'deepLinks': 'all ten original section IDs land below the sticky header'})
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'no-preference'}])
    browser.navigate('?qa=active-history')
    browser.evaluate('window.__atlasRestored=false; addEventListener("pageshow",e=>window.__atlasRestored=e.persisted)')
    browser.navigate('projects/cortex/')
    history = browser.call('Page.getNavigationHistory')
    browser.call('Page.navigateToHistoryEntry', entryId=history['entries'][history['currentIndex']-1]['id'])
    time.sleep(1.5)
    restored = browser.evaluate('({persisted:window.__atlasRestored, enhanced:document.documentElement.classList.contains("motion-enhanced"), triggers:ScrollTrigger.getAll().length, assets:document.querySelectorAll("[data-motion-asset]").length})')
    assert restored['enhanced'] and restored['assets'] == 2 and restored['triggers'] <= 25, restored
    results.append({'activeHistoryRestore': restored})
    for source in ['Object.defineProperty(navigator,"hardwareConcurrency",{value:2})', 'Object.defineProperty(navigator,"connection",{value:{saveData:true}})']:
        injection = browser.call('Page.addScriptToEvaluateOnNewDocument', source=source)
        browser.navigate('?qa=constrained')
        assert browser.evaluate('document.querySelectorAll("[data-motion-asset]").length') == 0
        assert browser.evaluate('document.querySelector("[data-contact-form]").hidden') is False
        browser.call('Page.removeScriptToEvaluateOnNewDocument', identifier=injection['identifier'])
    results.append({'constrainedSignals': 'simulated two-core and save-data environments skip GSAP but retain core UI'})
    results.append({'motionLoaded': loaded, 'checks': 'filters, validation, four routes at 375/1440, menu Escape, JS-disabled, blocked CDN/WebGL imports, live reduced motion'})
    (output / 'results.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
    print(json.dumps(results))


if __name__ == '__main__':
    main()
