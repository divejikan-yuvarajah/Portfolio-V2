const GSAP_VERSION = '3.15.0';
const CDN_ROOT = `https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_VERSION}`;
const assetPromises = new Map();
const prepared = new WeakSet();
let started = false;
let registered = false;
let introUsed = false;
let startupTime = 0;
let preference;
let gsap;
let ScrollTrigger;
let media;
let responsiveContext;
let introContext;
let active = false;
let refreshFrame = 0;
let effects = [];
let hooksInstalled = false;
let pageShowInstalled = false;

// All content is static until both exact-version APIs are ready.
function loadScript(name, source, ready) {
    if (ready()) return Promise.resolve();
    if (assetPromises.has(name)) return assetPromises.get(name);
    const promise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        let settled = false;
        const timeout = window.setTimeout(() => finish(new Error(`${name} timed out`)), 8000);
        function finish(error) {
            if (settled) return;
            settled = true;
            clearTimeout(timeout);
            script.onload = script.onerror = null;
            if (error) { script.remove(); reject(error); }
            else resolve();
        }
        script.src = source;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.dataset.motionAsset = name;
        script.onload = () => finish(ready() ? null : new Error(`${name} API unavailable`));
        script.onerror = () => finish(new Error(`${name} unavailable`));
        document.head.append(script);
    });
    assetPromises.set(name, promise);
    return promise;
}

function allowed() {
    return !preference?.matches && !navigator.connection?.saveData
        && !(navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2);
}

function queueRefresh() {
    if (!active || refreshFrame) return;
    refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        if (active) ScrollTrigger.refresh();
    });
}

function refreshProjects() {
    // Only decorative descendants move. Native hidden/focus state belongs to projects.js.
    effects.forEach(({ card, timeline }) => {
        if (card.hidden) timeline.scrollTrigger.disable(true);
        else timeline.scrollTrigger.enable(false, false);
    });
    queueRefresh();
}

function canEnter(element) {
    if (!element || prepared.has(element) || element.closest('[hidden]')) return false;
    prepared.add(element);
    // Never replay an entrance on visible content, deep links or a responsive rebuild.
    return element.getBoundingClientRect().top > innerHeight * .85;
}

function buildIntro() {
    if (introUsed || scrollY > 0 || performance.now() - startupTime > 1200 || location.hash) return;
    introUsed = true;
    const lines = document.querySelectorAll('.atlas-hero-line');
    if (!lines.length) return;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity,clipPath' } });
    tl.addLabel('identity', 0)
        .from('.navbar .container', { y: -6, duration: .35 }, 'identity')
        .from(lines, { yPercent: 105, duration: .75, stagger: .09 }, 'identity')
        .addLabel('builder', .12)
        .from('.hero-portrait', { clipPath: 'inset(0 0 100% 0)', duration: .85 }, 'builder')
        .from('.atlas-portrait-registration, .atlas-identity-caption', { x: 12, duration: .65, stagger: .08 }, 'builder')
        .addLabel('invitation', .3)
        .from('.hero-name, .hero-role, .hero-summary', { x: 10, opacity: .65, duration: .55, stagger: .05 }, 'invitation')
        .from('.hero-actions, .hero-cv-link', { x: 8, duration: .45, stagger: .05 }, 'invitation');
}

function buildChapters() {
    document.querySelectorAll('main > section:not(#hero)').forEach(section => {
        const title = section.querySelector('.atlas-title-text');
        const rail = section.querySelector('.atlas-chapter [data-atlas-rule]');
        const trigger = section.querySelector('.atlas-chapter');
        if (!canEnter(trigger)) return;
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: .7, clearProps: 'transform,clipPath' },
            scrollTrigger: { trigger, start: 'top 85%', once: true } });
        tl.addLabel('index', 0);
        if (rail) tl.from(rail, { scaleX: 0 }, 'index');
        if (title) tl.from(title, { clipPath: 'inset(0 100% 0 0)', x: 12 }, 'index+=0.08');
    });
    document.querySelectorAll('.skill-category-card, .employment-entry').forEach(row => {
        if (!canEnter(row)) return;
        const rule = row.querySelector('[data-atlas-rule]');
        if (rule) gsap.from(rule, { scaleX: 0, duration: .65, ease: 'power2.out', clearProps: 'transform',
            scrollTrigger: { trigger: row, start: 'top 85%', once: true } });
    });
}

function buildSignals() {
    document.querySelectorAll('.atlas-signal').forEach(signal => {
        if (!canEnter(signal)) return;
        const path = signal.querySelector('path');
        const point = signal.querySelector('circle');
        const tl = gsap.timeline({ scrollTrigger: { trigger: signal, start: 'top 85%', once: true } });
        tl.addLabel('route', 0)
            .fromTo(path, { strokeDasharray: 1, strokeDashoffset: 1 },
                { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 'route')
            .from(point, { scale: 0, transformOrigin: 'center', duration: .25, clearProps: 'transform', ease: 'power2.out' }, 'route+=0.75');
    });
}

function buildResultAndClosing() {
    const result = document.querySelector('.achievement-feature');
    if (canEnter(result)) {
        const tl = gsap.timeline({ defaults: { duration: .75, ease: 'power3.out', clearProps: 'transform,clipPath' },
            scrollTrigger: { trigger: result, start: 'top 80%', once: true } });
        tl.addLabel('result', 0)
            .from(result.querySelector('h3'), { clipPath: 'inset(0 100% 0 0)' }, 'result')
            .from(result.querySelector('.achievement-result-primary'), { x: 22 }, 'result+=0.12');
    }
    const closing = document.querySelector('.contact-title');
    if (canEnter(closing)) {
        gsap.timeline({ scrollTrigger: { trigger: closing, start: 'top 85%', once: true } })
            .addLabel('invitation', 0)
            .from(closing.querySelectorAll('.atlas-closing-line'), { yPercent: 105, stagger: .09, duration: .75,
                ease: 'power3.out', clearProps: 'transform' }, 'invitation');
    }
}

function buildFeaturedWork() {
    document.querySelectorAll('.project-card--featured').forEach(card => {
        const art = card.querySelector('.atlas-poster-art');
        const index = card.querySelector('.atlas-project-index');
        if (!art || card.hidden) return;
        const timeline = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: {
            trigger: card, start: 'top bottom', end: 'bottom top', scrub: .45, invalidateOnRefresh: true,
        } });
        timeline.addLabel('passage', 0)
            .fromTo(art, { yPercent: -5 }, { yPercent: 5, duration: 1 }, 'passage')
            .fromTo(index, { x: 0 }, { x: 12, duration: 1 }, 'passage');
        effects.push({ card, timeline });
    });
}

function installHooks() {
    if (hooksInstalled) return;
    hooksInstalled = true;
    document.addEventListener('portfolio:projects-filtered', refreshProjects);
    document.addEventListener('toggle', queueRefresh, true);
    document.addEventListener('load', queueRefresh, true);
    document.fonts?.ready.then(queueRefresh, () => {});
    queueRefresh();
}

function stopMotion() {
    // Keep the single media matcher for this page instance. In GSAP 3.15,
    // constructing a new matcher on every preference toggle allocates new MQL
    // listeners. Revert its public Context instead; refresh reuses the matcher.
    responsiveContext?.revert();
    introContext?.revert();
    introContext = null;
    active = false;
    effects = [];
    if (refreshFrame) cancelAnimationFrame(refreshFrame);
    refreshFrame = 0;
    document.removeEventListener('portfolio:projects-filtered', refreshProjects);
    document.removeEventListener('toggle', queueRefresh, true);
    document.removeEventListener('load', queueRefresh, true);
    hooksInstalled = false;
    document.documentElement.classList.remove('motion-enhanced');
}

async function startMotion() {
    if (!started || !allowed()) return;
    try {
        if (media) {
            // This page has one GSAP subsystem. Refresh existing media conditions
            // after a connection/preference change or BFCache restore, without
            // registering another query listener or retaining an old timeline.
            gsap.matchMediaRefresh();
            active = true;
            document.documentElement.classList.add('motion-enhanced');
            installHooks();
            return;
        }
        await loadScript('gsap-core', `${CDN_ROOT}/gsap.min.js`, () => window.gsap?.version === GSAP_VERSION);
        await loadScript('scroll-trigger', `${CDN_ROOT}/ScrollTrigger.min.js`, () => window.ScrollTrigger?.version === GSAP_VERSION);
        if (!started || media || !allowed()) return;
        gsap = window.gsap;
        ScrollTrigger = window.ScrollTrigger;
        if (!registered) { gsap.registerPlugin(ScrollTrigger); registered = true; }
        // Assign contexts before setup so a partial setup failure can revert all prepared styles.
        introContext = gsap.context(() => {}, document.body);
        introContext.add(buildIntro);
        media = gsap.matchMedia();
        // matchMedia creates its own scoped context. Do not nest another gsap.context inside it.
        media.add({ all: 'all', desktop: '(min-width: 1024px) and (min-height: 760px) and (pointer: fine)',
            reduce: '(prefers-reduced-motion: reduce)' }, context => {
            responsiveContext = context;
            if (!started || context.conditions.reduce || !allowed()) return;
            buildChapters();
            buildSignals();
            buildResultAndClosing();
            if (context.conditions.desktop) buildFeaturedWork();
            queueRefresh();
            return () => { effects = []; };
        }, document.body);
        active = true;
        document.documentElement.classList.add('motion-enhanced');
        installHooks();
    } catch {
        stopMotion();
    }
}

function preferenceChanged() {
    if (allowed()) void startMotion();
    else stopMotion();
}

function teardown() {
    started = false;
    stopMotion();
    preference?.removeEventListener('change', preferenceChanged);
    navigator.connection?.removeEventListener?.('change', preferenceChanged);
    window.removeEventListener('pagehide', teardown);
}

/** Single failure-safe entry. Core navigation/filter/form/Three.js modules stay independent. */
export function initMotion() {
    if (started) return;
    started = true;
    startupTime = performance.now();
    preference = matchMedia('(prefers-reduced-motion: reduce)');
    preference.addEventListener('change', preferenceChanged);
    navigator.connection?.addEventListener?.('change', preferenceChanged);
    window.addEventListener('pagehide', teardown, { once: true });
    if (!pageShowInstalled) {
        window.addEventListener('pageshow', event => { if (event.persisted) initMotion(); });
        pageShowInstalled = true;
    }
    preferenceChanged();
}
