"""Responsive Atlas browser checks using a local Edge/Chromium CDP session.

Prerequisites: serve this repository at http://127.0.0.1:8765, launch an
isolated Chromium-compatible browser with remote debugging on port 9222, and
install websocket-client in the QA environment (not a site dependency).
"""
import base64
import json
import time
from pathlib import Path
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
        response = self.call('Runtime.evaluate', expression=expression, returnByValue=True, awaitPromise=True)
        if 'exceptionDetails' in response:
            raise RuntimeError(response['exceptionDetails'])
        return response['result'].get('value')

    def viewport(self, width, height=900, *, touch=False):
        self.call('Emulation.setDeviceMetricsOverride', width=width, height=height, deviceScaleFactor=1, mobile=width <= 600)
        if touch:
            self.call('Emulation.setTouchEmulationEnabled', enabled=True, maxTouchPoints=1)
        else:
            self.call('Emulation.setTouchEmulationEnabled', enabled=False)

    def navigate(self, path=''):
        self.call('Page.navigate', url='http://127.0.0.1:8765/' + path)
        time.sleep(.8)

    def wait_for(self, expression, timeout=12):
        deadline = time.monotonic() + timeout
        while time.monotonic() < deadline:
            if self.evaluate(expression):
                return True
            time.sleep(.2)
        return False

    def screenshot(self, path):
        data = self.call('Page.captureScreenshot', format='png', captureBeyondViewport=False)['data']
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(base64.b64decode(data))


def check(condition, message):
    if not condition:
        raise AssertionError(message)


def main():
    browser = Browser()
    browser.call('Page.enable')
    browser.call('Network.enable')
    browser.call('Network.setCacheDisabled', cacheDisabled=True)
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
    output = Path('docs/qa/task15/after')
    widths = [320, 360, 375, 390, 414, 430, 600, 768, 820, 912, 980, 1024, 1280, 1440]
    viewport_results = []
    for width in widths:
        browser.viewport(width, touch=width <= 1024)
        browser.navigate()
        metrics = browser.evaluate("""(()=>({width:innerWidth,client:document.documentElement.clientWidth,page:document.documentElement.scrollWidth,
          h1:document.querySelectorAll('h1').length,projects:document.querySelectorAll('[data-project-card]').length,
          hero:document.querySelector('.hero-title').getBoundingClientRect().toJSON(),
          titleTransform:getComputedStyle(document.querySelector('.atlas-hero-line')).transform,
          menuMax:getComputedStyle(document.querySelector('.nav-links')).maxHeight,
          formFont:getComputedStyle(document.querySelector('#contact-name')).fontSize,
          offscreen:[...document.querySelectorAll('.hero-title,.hero-actions,.hero-cv-link')].some(e=>e.getBoundingClientRect().right>innerWidth+1)}))()""")
        check(metrics['page'] <= metrics['client'], f'horizontal overflow at {width}: {metrics}')
        check(metrics['h1'] == 1 and metrics['projects'] == 17, f'content count at {width}: {metrics}')
        check(not metrics['offscreen'], f'Hero overflow at {width}: {metrics}')
        check(float(metrics['formFont'][:-2]) >= 16, f'mobile form font below 16px at {width}: {metrics}')
        viewport_results.append(metrics)
        if width in [320, 375, 768, 1024, 1440]:
            browser.screenshot(output / f'home-{width}.png')

    short_results = []
    for width, height, touch in [(844, 390, True), (1280, 600, False), (720, 500, True), (1024, 568, False)]:
        browser.viewport(width, height, touch=touch)
        browser.navigate()
        result = browser.evaluate("""({width:innerWidth,height:innerHeight,page:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,
          sticky:getComputedStyle(document.querySelector('.project-illustration')).position})""")
        check(result['page'] <= result['client'], f'short viewport overflow: {result}')
        check(result['sticky'] != 'sticky', f'short viewport sticky poster: {result}')
        short_results.append({'viewport': f'{width}x{height}', **result})

    height_results = []
    for height in [568, 667, 740, 760, 900]:
        browser.viewport(375, height, touch=True)
        browser.navigate()
        result = browser.evaluate("""({width:innerWidth,height:innerHeight,page:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,
          hero:document.querySelector('.hero-title').getBoundingClientRect().toJSON(),sticky:getComputedStyle(document.querySelector('.project-illustration')).position})""")
        check(result['page'] <= result['client'] and result['sticky'] != 'sticky', f'phone height {height}: {result}')
        height_results.append(result)

    # 320x568 dropdown fits its visual viewport and exposes every link by scrolling.
    browser.viewport(320, 568, touch=True)
    browser.navigate()
    browser.evaluate("document.querySelector('.menu-toggle').focus(); document.querySelector('.menu-toggle').click()")
    menu = browser.evaluate("""(()=>{let m=document.querySelector('.nav-links');return {open:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),
      max:m.clientHeight,scroll:m.scrollHeight,links:[...m.querySelectorAll('a')].length,visible:m.getBoundingClientRect().bottom<=innerHeight+1}})()""")
    check(menu['open'] == 'true' and menu['visible'] and menu['links'] >= 7, f'mobile menu bounds: {menu}')
    browser.evaluate("document.querySelector('.nav-links').scrollTop=document.querySelector('.nav-links').scrollHeight")
    check(browser.evaluate("document.querySelector('.nav-links').scrollTop > 0") or menu['scroll'] <= menu['max'], 'menu final links not scrollable')
    browser.call('Input.dispatchKeyEvent', type='keyDown', key='Escape', code='Escape', windowsVirtualKeyCode=27)
    check(browser.evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')") == 'false', 'Escape did not close menu')
    check(browser.evaluate("document.activeElement === document.querySelector('.menu-toggle')"), 'Escape did not restore focus to menu button')
    browser.evaluate("document.querySelector('.menu-toggle').click(); document.querySelector('.atlas-edition').dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))")
    check(browser.evaluate("document.querySelector('.menu-toggle').getAttribute('aria-expanded')") == 'false', 'outside pointer did not close menu')
    browser.evaluate("document.querySelector('.menu-toggle').click(); document.querySelector('.nav-links a[href=\\\"#contact\\\"]').click()")
    nav_selection = browser.evaluate("({open:document.querySelector('.menu-toggle').getAttribute('aria-expanded'),hash:location.hash})")
    check(nav_selection['open'] == 'false' and nav_selection['hash'] == '#contact', f'menu link selection: {nav_selection}')

    # Filters, CTA/hash geometry, direct case pages, relative CSS and assets.
    browser.viewport(375, touch=True)
    browser.navigate()
    browser.evaluate("document.querySelector('[data-filter=finance]').click()")
    check(browser.evaluate("document.querySelectorAll('[data-project-card]:not([hidden])').length") == 1, 'finance filter')
    browser.evaluate("document.querySelector('[data-filter=all]').click()")
    check(browser.evaluate("document.querySelectorAll('[data-project-card]:not([hidden])').length") == 17, 'all filter')
    browser.evaluate("document.querySelector('[data-contact-form]').requestSubmit()")
    contact = browser.evaluate("""({invalid:document.querySelector('#contact-name').getAttribute('aria-invalid'),
      status:document.querySelector('[data-contact-status]').textContent.trim(),email:document.querySelector('.contact-email-link').getAttribute('href'),
      links:[...document.querySelectorAll('.contact-social-links a')].map(a=>a.href),cv:document.querySelector('.hero-cv-link').getAttribute('href')})""")
    check(contact['invalid'] == 'true' and 'review' in contact['status'].lower(), f'contact validation: {contact}')
    check(contact['email'].startswith('mailto:') and len(contact['links']) >= 2 and contact['cv'] == 'images/My_CV.pdf', f'contact/CV links: {contact}')
    tap_targets = browser.evaluate("""[...document.querySelectorAll('.hero-action,.hero-cv-link,.project-link,.contact-submit,.contact-social-links a')]
      .map(e=>{const r=e.getBoundingClientRect();return {label:e.textContent.trim().slice(0,32),width:Math.round(r.width),height:Math.round(r.height)}})
      .filter(e=>e.width&&e.height)""")
    check(tap_targets and min(target['width'] for target in tap_targets) >= 44 and min(target['height'] for target in tap_targets) >= 44,
      f'touch action target below 44 CSS px: {tap_targets}')
    hash_results=[]
    for ident in ['hero','about','skills','projects','achievements','experience','community','education','certifications','contact']:
        browser.evaluate(f"location.hash='{ident}'")
        time.sleep(.08)
        pos=browser.evaluate(f"({{top:document.getElementById('{ident}').getBoundingClientRect().top,header:document.querySelector('.navbar').getBoundingClientRect().bottom}})")
        check(pos['top'] >= pos['header'] - 1, f'anchor occluded by header ({ident}): {pos}')
        hash_results.append(ident)
    browser.navigate()
    browser.viewport(375, 900, touch=True)
    for selector, filename in [('#work-flowpilot-ai','work-flowpilot-375'),('#projects','projects-375'),
      ('#achievements','achievements-375'),('#experience','experience-375'),('#community','community-375'),
      ('#education','education-375'),('#contact','contact-375'),('[data-contact-form]','contact-form-375')]:
        browser.evaluate(f"document.querySelector('{selector}').scrollIntoView({{behavior:'instant',block:'start'}})")
        time.sleep(.1)
        browser.screenshot(output / f'{filename}.png')
    browser.navigate()
    browser.evaluate('document.activeElement.blur(); window.scrollTo({top:0,behavior:"instant"})')
    keyboard = []
    for _ in range(120):
        browser.call('Input.dispatchKeyEvent', type='keyDown', key='Tab', code='Tab', windowsVirtualKeyCode=9)
        browser.call('Input.dispatchKeyEvent', type='keyUp', key='Tab', code='Tab', windowsVirtualKeyCode=9)
        item = browser.evaluate("""(()=>{const e=document.activeElement,r=e.getBoundingClientRect(),header=document.querySelector('.navbar').getBoundingClientRect();return {
          id:e.id,href:e.getAttribute('href'),tag:e.tagName,visible:e.matches('.skip-link') || (r.bottom>(e.closest('.navbar')?0:header.bottom-1)&&r.top<innerHeight&&r.right>0&&r.left<innerWidth)}})()""")
        check(item['visible'], f'keyboard focus not visible: {item}')
        keyboard.append(item)
        if item['id'] == 'contact-message':
            break
    check(any(item['id'] == 'contact-message' for item in keyboard), 'Tab journey did not reach contact form')
    check(all(any(item['href'] == f'projects/{slug}/' for item in keyboard) for slug in ['flowpilot-ai','cortex','mediguardian-ai','infraos']), 'Tab journey missed a flagship case link')
    routes = []
    for width in [375, 768]:
        browser.viewport(width, touch=True)
        for slug in ['flowpilot-ai', 'cortex', 'mediguardian-ai', 'infraos']:
            browser.navigate(f'projects/{slug}/')
            route = browser.evaluate("""({h1:document.querySelectorAll('h1').length,page:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,
              illustration:!!document.querySelector('.case-illustration'),title:document.querySelector('h1')?.textContent.trim(),css:[...document.styleSheets].some(s=>s.href?.endsWith('case-studies.css'))})""")
            check(route['h1'] == 1 and route['page'] <= route['client'] and route['illustration'] and route['css'], f'{slug} at {width}: {route}')
            routes.append({'width': width, 'slug': slug, **route})
            if slug == 'cortex' and width == 375:
                browser.screenshot(output / 'case-cortex-375.png')

    # Touch media at tablet width disables sticky/scrub/WebGL; desktop motion returns after resize.
    browser.viewport(1024, 900, touch=True)
    browser.navigate()
    touch_state = browser.evaluate("""({coarse:matchMedia('(pointer: coarse)').matches,hover:matchMedia('(hover: hover)').matches,
      sticky:getComputedStyle(document.querySelector('.project-illustration')).position,canvas:!!document.querySelector('#bg-canvas')})""")
    check(touch_state['coarse'] and touch_state['sticky'] != 'sticky' and not touch_state['canvas'], f'touch tablet effects: {touch_state}')

    # Reduced motion, save-data, and CDN failure remain progressive-enhancement paths.
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
    browser.viewport(1440, 900)
    browser.navigate()
    reduced = browser.evaluate("""({motionAssets:document.querySelectorAll('[data-motion-asset]').length,canvas:!!document.querySelector('#bg-canvas'),h1:document.querySelector('.hero-title').getBoundingClientRect().height})""")
    check(reduced['motionAssets'] == 0 and not reduced['canvas'] and reduced['h1'] > 0, f'reduced-motion initial load: {reduced}')
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'forced-colors', 'value': 'active'}])
    browser.viewport(375, touch=True)
    browser.navigate()
    forced = browser.evaluate("""({active:matchMedia('(forced-colors: active)').matches,page:document.documentElement.scrollWidth,
      client:document.documentElement.clientWidth,h1:document.querySelector('.hero-title').getBoundingClientRect().height,
      signal:getComputedStyle(document.querySelector('.atlas-signal')).display})""")
    check(forced['active'] and forced['page'] <= forced['client'] and forced['h1'] > 0 and forced['signal'] == 'none', f'forced-colors layout: {forced}')
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'forced-colors', 'value': 'none'}])
    injection = browser.call('Page.addScriptToEvaluateOnNewDocument', source='Object.defineProperty(navigator,"connection",{value:{saveData:true}})')
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'no-preference'}])
    browser.navigate('?qa=save-data')
    save_data = browser.evaluate("""({canvas:!!document.querySelector('#bg-canvas'),motionAssets:document.querySelectorAll('[data-motion-asset]').length,
      h1:document.querySelector('.hero-title').getBoundingClientRect().height,projects:document.querySelectorAll('[data-project-card]').length})""")
    check(not save_data['canvas'] and save_data['motionAssets'] == 0 and save_data['h1'] > 0 and save_data['projects'] == 17, f'save-data fallback: {save_data}')
    browser.call('Page.removeScriptToEvaluateOnNewDocument', identifier=injection['identifier'])
    injection = browser.call('Page.addScriptToEvaluateOnNewDocument', source='Object.defineProperty(navigator,"hardwareConcurrency",{value:2})')
    browser.navigate('?qa=low-core')
    low_core = browser.evaluate("""({canvas:!!document.querySelector('#bg-canvas'),motionAssets:document.querySelectorAll('[data-motion-asset]').length,
      h1:document.querySelector('.hero-title').getBoundingClientRect().height,projects:document.querySelectorAll('[data-project-card]').length})""")
    check(not low_core['canvas'] and low_core['motionAssets'] == 0 and low_core['h1'] > 0 and low_core['projects'] == 17, f'low-core fallback: {low_core}')
    browser.call('Page.removeScriptToEvaluateOnNewDocument', identifier=injection['identifier'])

    browser.call('Network.setBlockedURLs', urls=['*cdnjs.cloudflare.com/ajax/libs/gsap/*'])
    browser.navigate('?qa=gsap-blocked')
    blocked_gsap = browser.evaluate("""({h1:document.querySelector('.hero-title').getBoundingClientRect().height,projects:document.querySelectorAll('[data-project-card]').length,
      filterHidden:document.querySelector('.projects-filter').hidden,formHidden:document.querySelector('[data-contact-form]').hidden})""")
    check(blocked_gsap['h1'] > 0 and blocked_gsap['projects'] == 17 and not blocked_gsap['filterHidden'] and not blocked_gsap['formHidden'], f'blocked GSAP fallback: {blocked_gsap}')
    browser.call('Network.setBlockedURLs', urls=['*unpkg.com/three*'])
    browser.navigate('?qa=three-blocked')
    blocked_three = browser.evaluate("""({h1:document.querySelector('.hero-title').getBoundingClientRect().height,projects:document.querySelectorAll('[data-project-card]').length,
      canvas:!!document.querySelector('#bg-canvas')})""")
    check(blocked_three['h1'] > 0 and blocked_three['projects'] == 17 and not blocked_three['canvas'], f'blocked Three.js fallback: {blocked_three}')
    browser.call('Network.setBlockedURLs', urls=[])

    # Static no-JS document remains readable and keeps every project link.
    browser.call('Emulation.setScriptExecutionDisabled', value=True)
    browser.viewport(375, touch=True)
    browser.navigate()
    no_js = browser.evaluate("({h1:document.querySelectorAll('h1').length,projects:document.querySelectorAll('[data-project-card]').length,hero:document.querySelector('.hero-title').getBoundingClientRect().height})")
    check(no_js['h1'] == 1 and no_js['projects'] == 17 and no_js['hero'] > 0, f'no-JS document: {no_js}')
    browser.call('Emulation.setScriptExecutionDisabled', value=False)

    # Normal motion stays static on touch; desktop creates only the four decorative scrub triggers.
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'no-preference'}])
    browser.viewport(375, touch=True)
    browser.navigate()
    browser.wait_for('window.ScrollTrigger?.version === "3.15.0"')
    time.sleep(.5)
    phone = browser.evaluate("""({gsap:window.gsap?.version,heroTransform:getComputedStyle(document.querySelector('.atlas-hero-line')).transform,
      heroClip:getComputedStyle(document.querySelector('.atlas-mask')).overflow,canvas:!!document.querySelector('#bg-canvas'),
      scrub:window.ScrollTrigger?.getAll().filter(t=>t.vars.scrub).length||0})""")
    check(phone['heroTransform'] == 'none' and phone['canvas'] is False and phone['scrub'] == 0, f'phone static hero: {phone}')
    browser.viewport(1440, 900, touch=False)
    browser.navigate()
    browser.wait_for('window.ScrollTrigger?.version === "3.15.0"')
    time.sleep(.5)
    desktop = browser.evaluate("""({gsap:window.gsap?.version,scrollTrigger:window.ScrollTrigger?.version,
      scrub:window.ScrollTrigger?.getAll().filter(t=>t.vars.scrub).length,
      sticky:getComputedStyle(document.querySelector('.project-illustration')).position})""")
    check(desktop['gsap'] == '3.15.0' and desktop['scrollTrigger'] == '3.15.0', f'GSAP versions: {desktop}')
    check(desktop['scrub'] == 4 and desktop['sticky'] == 'sticky', f'desktop effects: {desktop}')
    browser.evaluate("document.querySelector('[data-filter=finance]').click()")
    time.sleep(.2)
    finance_motion = browser.evaluate("({cards:document.querySelectorAll('[data-project-card]:not([hidden])').length,scrub:ScrollTrigger.getAll().filter(t=>t.vars.scrub&&t.enabled).length})")
    check(finance_motion['cards'] == 1 and finance_motion['scrub'] == 1, f'filter did not disable hidden scrubs: {finance_motion}')
    browser.evaluate("document.querySelector('[data-filter=all]').click()")
    time.sleep(.2)
    check(browser.evaluate("ScrollTrigger.getAll().filter(t=>t.vars.scrub&&t.enabled).length") == 4, 'project scrubs did not restore after All filter')
    browser.viewport(375, touch=True)
    time.sleep(.6)
    check(browser.evaluate("ScrollTrigger.getAll().filter(t=>t.vars.scrub).length") == 0, 'scrubs remained on phone resize')
    browser.viewport(1440, 900, touch=False)
    time.sleep(.6)
    check(browser.evaluate("ScrollTrigger.getAll().filter(t=>t.vars.scrub).length") == 4, 'desktop scrubs did not restore after resize')
    browser.screenshot(output / 'home-1440.png')

    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'reduce'}])
    time.sleep(.3)
    reduced_live = browser.evaluate("({scrub:ScrollTrigger.getAll().filter(t=>t.vars.scrub).length,enhanced:document.documentElement.classList.contains('motion-enhanced'),hero:getComputedStyle(document.querySelector('.atlas-hero-line')).transform})")
    check(reduced_live['scrub'] == 0 and reduced_live['hero'] == 'none', f'live reduced motion: {reduced_live}')
    browser.call('Emulation.setEmulatedMedia', features=[{'name': 'prefers-reduced-motion', 'value': 'no-preference'}])
    time.sleep(.5)
    restored_motion = browser.evaluate("({scrub:ScrollTrigger.getAll().filter(t=>t.vars.scrub&&t.enabled).length,hero:getComputedStyle(document.querySelector('.atlas-hero-line')).transform})")
    check(restored_motion['scrub'] == 4 and restored_motion['hero'] == 'none', f'restored motion replayed or duplicated: {restored_motion}')

    browser.evaluate('window.__atlasPersisted=false; addEventListener("pageshow",event=>window.__atlasPersisted=event.persisted)')
    browser.navigate('projects/flowpilot-ai/')
    history = browser.call('Page.getNavigationHistory')
    previous = history['entries'][history['currentIndex'] - 1]
    browser.call('Page.navigateToHistoryEntry', entryId=previous['id'])
    browser.wait_for("document.documentElement.classList.contains('motion-enhanced')")
    time.sleep(.2)
    history_restore = browser.evaluate("""({home:!!document.querySelector('#hero'),persisted:window.__atlasPersisted,
      navigation:performance.getEntriesByType('navigation')[0]?.type,
      enhanced:document.documentElement.classList.contains('motion-enhanced'),scrub:window.ScrollTrigger?.getAll().filter(t=>t.vars.scrub).length||0})""")
    check(history_restore['home'] and history_restore['enhanced'] and history_restore['scrub'] <= 4, f'back/forward restore: {history_restore}')

    summary = {
        'browser': json.load(urlopen('http://127.0.0.1:9222/json/version'))['Browser'],
        'widths': viewport_results,
        'shortViewports': short_results,
        'phoneHeights': height_results,
        'mobileMenu320x568': menu,
        'menuOutsideAndSelection': nav_selection,
        'contact': contact,
        'touchTargets': tap_targets,
        'sectionHashes': hash_results,
        'keyboardJourney': keyboard,
        'filteredMotion': finance_motion,
        'caseRoutes375and768': routes,
        'touchTablet1024': touch_state,
        'noJavaScript': no_js,
        'reducedMotion': reduced,
        'forcedColors': forced,
        'saveData': save_data,
        'lowCore': low_core,
        'blockedGSAP': blocked_gsap,
        'blockedThree': blocked_three,
        'phoneMotion': phone,
        'desktopMotion': desktop,
        'liveReducedMotion': reduced_live,
        'restoredMotion': restored_motion,
        'backForwardRestore': history_restore,
        'result': 'PASS',
    }
    Path('docs/qa/task15/results.json').write_text(json.dumps(summary, indent=2), encoding='utf-8')
    print(json.dumps({'browser': summary['browser'], 'widths': len(widths), 'shortViewports': short_results,
      'routes': len(routes), 'menu': menu, 'phoneHeights': [r['height'] for r in height_results],
      'contact': contact, 'hashes': len(hash_results), 'noJavaScript': no_js, 'reducedMotion': reduced,
      'touchTargets': len(tap_targets), 'forcedColors': forced,
      'keyboardStops': len(keyboard), 'filteredMotion': finance_motion,
      'saveData': save_data, 'blockedGSAP': blocked_gsap, 'blockedThree': blocked_three,
      'lowCore': low_core,
      'phoneMotion': phone, 'desktopMotion': desktop, 'liveReducedMotion': reduced_live,
      'restoredMotion': restored_motion, 'backForwardRestore': history_restore, 'result': 'PASS'}, indent=2))


if __name__ == '__main__':
    main()
