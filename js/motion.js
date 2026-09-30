import { buildAtlasPolishMotion } from './atlas-gsap-extensions.js';
import { setAtlasObservatoryProject } from './atlas-interactions.js';

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
let active = false;
let refreshFrame = 0;
let observatoryTriggers = [];
let observatoryStage;
let observatoryTransition;
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
    // projects.js remains the sole owner of card/group hidden state and filter buttons.
    observatoryTriggers.forEach(({ card, trigger }) => {
        if (card.hidden || card.closest('[hidden]')) trigger.disable(true);
        else trigger.enable(false, false);
    });
    const visible = [...document.querySelectorAll('.project-card--featured')]
        .filter(card => !card.hidden && !card.closest('[hidden]'));
    const current = visible.find(card => card.dataset.caseStudySlug === observatoryStage?.dataset.activeProject);
    if (visible.length) setObservatoryProject(current?.dataset.caseStudySlug || visible[0].dataset.caseStudySlug, false);
    queueRefresh();
}

function setObservatoryProject(slug, transition = true) {
    if (!observatoryStage || !slug) return;
    setAtlasObservatoryProject(slug);
    if (transition && observatoryTransition) observatoryTransition.restart();
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
    tl.addLabel('BOOT', 0)
        .from('.atlas-edition, .hero-eyebrow', { y: 8, opacity: .6, duration: .3, stagger: .04 }, 'BOOT')
        .addLabel('HEADLINE', .08)
        .from(lines, { yPercent: 105, duration: .62, stagger: .075 }, 'HEADLINE')
        .addLabel('FRAME', .2)
        .from('.hero-portrait', { clipPath: 'inset(0 0 100% 0)', duration: .72 }, 'FRAME')
        .from('.atlas-portrait-registration, .atlas-identity-caption', { x: 10, duration: .46, stagger: .06 }, 'FRAME+=0.08')
        .from('.hero-route-diagram', { scaleX: 0, transformOrigin: 'left center', duration: .55 }, 'FRAME+=0.14')
        .addLabel('IDENTITY', .46)
        .from('.hero-name, .hero-role, .hero-summary', { x: 8, opacity: .68, duration: .42, stagger: .035 }, 'IDENTITY')
        .addLabel('INVITATION', .72)
        .from('.hero-actions, .hero-cv-link', { y: 7, duration: .36, stagger: .04 }, 'INVITATION');
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
    document.querySelectorAll('.living-route-diagram:not(.hero-route-diagram)').forEach(route => {
        if (!canEnter(route)) return;
        gsap.from(route, { clipPath: 'inset(0 100% 0 0)', duration: .72, ease: 'power2.inOut', clearProps: 'clipPath',
            scrollTrigger: { trigger: route, start: 'top 88%', once: true } });
    });
    const observatoryRoute = document.querySelector('.observatory-route-path');
    if (observatoryRoute && canEnter(observatoryRoute)) {
        gsap.fromTo(observatoryRoute, { strokeDasharray: 1, strokeDashoffset: 1 }, {
            strokeDashoffset: 0, duration: .8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset',
            scrollTrigger: { trigger: observatoryStage || document.querySelector('[data-project-observatory]'), start: 'top 82%', once: true }
        });
    }
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

function buildProjectObservatory() {
    observatoryStage = document.querySelector('[data-project-observatory]');
    if (!observatoryStage) return;
    const stories = [...observatoryStage.querySelectorAll('.project-card--featured')];
    observatoryTransition = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
        .fromTo(observatoryStage, { y: 5 }, { y: 0, duration: .28, clearProps: 'transform' });

    // Exactly one state trigger per featured project; text/actions stay in document flow.
    stories.forEach(card => {
        const trigger = ScrollTrigger.create({
            trigger: card,
            start: 'top 58%',
            end: 'bottom 42%',
            invalidateOnRefresh: true,
            onEnter: () => { setObservatoryProject(card.dataset.caseStudySlug); },
            onEnterBack: () => { setObservatoryProject(card.dataset.caseStudySlug); }
        });
        observatoryTriggers.push({ card, trigger });
    });

    const hashId = decodeURIComponent(location.hash.slice(1));
    const linkedStory = stories.find(card => card.id === hashId);
    const centerStory = stories.find(card => {
        const bounds = card.getBoundingClientRect();
        return bounds.top <= innerHeight * .55 && bounds.bottom >= innerHeight * .42;
    });
    setObservatoryProject((linkedStory || centerStory || stories.find(card => !card.hidden))?.dataset.caseStudySlug, false);
}

function buildMagneticActions() {
    const targets = [...document.querySelectorAll('.hero-action-primary, .contact-submit')];
    const cleanup = [];
    targets.forEach(target => {
        const moveX = gsap.quickTo(target, 'x', { duration: .3, ease: 'power3.out' });
        const moveY = gsap.quickTo(target, 'y', { duration: .3, ease: 'power3.out' });
        let bounds;
        const onEnter = () => { bounds = target.getBoundingClientRect(); };
        const onMove = event => {
            if (!bounds) return;
            const dx = (event.clientX - (bounds.left + bounds.width / 2)) * .12;
            const dy = (event.clientY - (bounds.top + bounds.height / 2)) * .12;
            moveX(Math.max(-5, Math.min(5, dx)));
            moveY(Math.max(-4, Math.min(4, dy)));
        };
        const onLeave = () => { bounds = null; moveX(0); moveY(0); };
        target.addEventListener('pointerenter', onEnter, { passive: true });
        target.addEventListener('pointermove', onMove, { passive: true });
        target.addEventListener('pointerleave', onLeave, { passive: true });
        cleanup.push(() => {
            target.removeEventListener('pointerenter', onEnter);
            target.removeEventListener('pointermove', onMove);
            target.removeEventListener('pointerleave', onLeave);
            gsap.set(target, { clearProps: 'transform' });
        });
    });
    return () => cleanup.forEach(remove => remove());
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
    active = false;
    observatoryTriggers = [];
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
        media = gsap.matchMedia();
        // matchMedia creates its own scoped context. Do not nest another gsap.context inside it.
        media.add({ all: 'all', desktopCreative: '(min-width: 1024px) and (min-height: 760px) and (pointer: fine) and (hover: hover)',
            tablet: '(min-width: 701px) and (max-width: 1023px) and (min-height: 600px)',
            reduce: '(prefers-reduced-motion: reduce)' }, context => {
            responsiveContext = context;
            if (!started || context.conditions.reduce || !allowed()) return;
            // Keep the authored cover fully visible on phones, touch screens and
            // short windows. Its clip masks are reserved for a spacious desktop.
            if (context.conditions.desktopCreative) buildIntro();
            else introUsed = true;
            buildChapters();
            buildSignals();
            buildAtlasPolishMotion(gsap, canEnter);
            buildResultAndClosing();
            if (context.conditions.desktopCreative || context.conditions.tablet) buildProjectObservatory();
            const removeMagneticActions = context.conditions.desktopCreative ? buildMagneticActions() : null;
            queueRefresh();
            return () => {
                observatoryTriggers = [];
                observatoryTransition = null;
                observatoryStage = null;
                setAtlasObservatoryProject('flowpilot-ai');
                removeMagneticActions?.();
            };
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
