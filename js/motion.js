const GSAP_VERSION = '3.15.0';
const CDN_ROOT = `https://cdnjs.cloudflare.com/ajax/libs/gsap/${GSAP_VERSION}`;
const ASSET_TIMEOUT_MS = 8000;

const MOTION_GROUPS = [
    { section: '#about', targets: '.about-eyebrow, .about-title, .about-copy, .about-project-link, .about-focus-item', stagger: 0.055 },
    { section: '#skills', targets: '.skills-header, .skill-category-card', stagger: 0.06 },
    { section: '#projects', targets: '.projects-heading', stagger: 0.04 },
    { section: '#projects', targets: '.projects-featured-grid', stagger: 0.04 },
    { section: '#projects', targets: '.projects-compact-grid', stagger: 0.04 },
    { section: '#achievements', targets: '.achievements-eyebrow, #achievements .section-title, .achievements-intro, .achievement-feature, .achievement-card', stagger: 0.055 },
    { section: '#experience', targets: '.experience-eyebrow, #experience > .container > .section-title, .experience-intro, .experience-group-heading, .venture-card, .employment-item', stagger: 0.05 },
    { section: '#community', targets: '.community-eyebrow, #community .section-title, .community-intro, .community-feature, .community-role-card, .community-involvement-card', stagger: 0.055 },
    { section: '#education', targets: '.education-eyebrow, #education .section-title, .education-intro, .education-card', stagger: 0.06 },
    { section: '#certifications', targets: '.credentials-eyebrow, #certifications .section-title, .credentials-intro, .learning-card', stagger: 0.06 },
    { section: '#contact', targets: '.contact-heading, .contact-details, .contact-form:not([hidden])', stagger: 0.07 },
];

let started = false;
let active = false;
let registered = false;
let gsapApi = null;
let scrollTriggerApi = null;
let activeContext = null;
let motionPreference = null;
let preferenceHandler = null;
let pageHideHandler = null;
let pageShowHandler = null;
let projectFilterHandler = null;
let loadHandler = null;
let refreshFrame = 0;
let assetPromise = null;
let startupTime = 0;
const assetPromises = new Map();
const preparedTargets = new Set();
const completedTargets = new WeakSet();

function loadScript(name, source, isReady) {
    if (isReady()) return Promise.resolve();
    if (assetPromises.has(name)) return assetPromises.get(name);

    const promise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        let settled = false;
        const timeout = window.setTimeout(() => finish(new Error(`Timed out loading ${name}`)), ASSET_TIMEOUT_MS);

        function finish(error) {
            if (settled) return;
            settled = true;
            window.clearTimeout(timeout);
            script.onload = null;
            script.onerror = null;
            if (error) {
                script.remove();
                reject(error);
                return;
            }
            resolve();
        }

        script.src = source;
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.dataset.motionAsset = name;
        script.onload = () => finish(isReady() ? null : new Error(`${name} did not expose its browser API`));
        script.onerror = () => finish(new Error(`Could not load ${name}`));
        document.head.append(script);
    });

    assetPromises.set(name, promise);
    return promise;
}

function loadGsapAssets() {
    if (!assetPromise) {
        assetPromise = loadScript('gsap-core', `${CDN_ROOT}/gsap.min.js`, () => Boolean(window.gsap))
            .then(() => loadScript('scroll-trigger', `${CDN_ROOT}/ScrollTrigger.min.js`, () => Boolean(window.ScrollTrigger)))
            .then(() => ({ gsap: window.gsap, ScrollTrigger: window.ScrollTrigger }));
    }

    return assetPromise;
}

function shouldAnimate() {
    if (motionPreference?.matches) return false;
    const connection = navigator.connection;
    if (connection?.saveData) return false;
    if (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2) return false;
    return true;
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

function queueRefresh() {
    if (!active || refreshFrame) return;
    refreshFrame = window.requestAnimationFrame(() => {
        refreshFrame = 0;
        if (active) scrollTriggerApi.refresh();
    });
}

function animateHero() {
    if (window.scrollY > 0 || performance.now() - startupTime > 1200) return;

    const hero = document.querySelector('#hero');
    if (!hero) return;
    const targets = [...hero.querySelectorAll('.hero-eyebrow, .hero-title, .hero-role, .hero-summary, .hero-actions, .hero-cv-link, .hero-visual')];
    if (!targets.length) return;

    gsapApi.from(targets, {
        y: 8,
        duration: 0.42,
        ease: 'power2.out',
        stagger: 0.045,
        clearProps: 'transform',
    });
}

function addScrollReveal(section, selector, triggerSelector, stagger) {
    const targets = [...section.querySelectorAll(selector)].filter((element) => {
        if (completedTargets.has(element) || element.closest('[hidden]')) return false;
        return !isInViewport(element);
    });
    if (!targets.length) return;

    const trigger = triggerSelector ? section.querySelector(triggerSelector) : section;
    if (!trigger || trigger.closest('[hidden]')) return;

    targets.forEach((target) => preparedTargets.add(target));
    gsapApi.fromTo(targets,
        { autoAlpha: 0, y: 14 },
        {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            ease: 'power2.out',
            stagger,
            clearProps: 'opacity,transform,visibility',
            onComplete: () => targets.forEach((target) => {
                completedTargets.add(target);
                preparedTargets.delete(target);
            }),
            scrollTrigger: {
                trigger,
                start: 'top 85%',
                once: true,
                invalidateOnRefresh: true,
            },
        });
}

function installRefreshHooks() {
    projectFilterHandler = queueRefresh;
    document.addEventListener('portfolio:projects-filtered', projectFilterHandler);

    loadHandler = queueRefresh;
    if (document.readyState === 'complete') queueRefresh();
    else window.addEventListener('load', loadHandler, { once: true });

    if (document.fonts?.ready) document.fonts.ready.then(queueRefresh, () => {});
}

function clearRefreshHooks() {
    if (projectFilterHandler) document.removeEventListener('portfolio:projects-filtered', projectFilterHandler);
    if (loadHandler) window.removeEventListener('load', loadHandler);
    projectFilterHandler = null;
    loadHandler = null;
    if (refreshFrame) window.cancelAnimationFrame(refreshFrame);
    refreshFrame = 0;
}

function stopMotion() {
    if (active) {
        preparedTargets.forEach((target) => completedTargets.add(target));
        activeContext?.revert();
        activeContext = null;
        document.documentElement.classList.remove('motion-enhanced');
        active = false;
    }

    preparedTargets.clear();
    clearRefreshHooks();
}

async function startMotion() {
    if (!started || active || !shouldAnimate()) return;

    try {
        const apis = await loadGsapAssets();
        if (!started || active || !shouldAnimate()) return;

        gsapApi = apis.gsap;
        scrollTriggerApi = apis.ScrollTrigger;
        if (!registered) {
            gsapApi.registerPlugin(scrollTriggerApi);
            registered = true;
        }

        activeContext = gsapApi.context(() => {
            animateHero();
            MOTION_GROUPS.forEach(({ section: sectionSelector, targets, trigger, stagger }) => {
                const section = document.querySelector(sectionSelector);
                if (section) addScrollReveal(section, targets, trigger, stagger);
            });
        });
        active = true;
        document.documentElement.classList.add('motion-enhanced');
        installRefreshHooks();
    } catch {
        stopMotion();
    }
}

function handlePreferenceChange() {
    if (shouldAnimate()) void startMotion();
    else stopMotion();
}

function teardownPage() {
    stopMotion();
    started = false;
    if (motionPreference && preferenceHandler) {
        if (motionPreference.removeEventListener) motionPreference.removeEventListener('change', preferenceHandler);
        else motionPreference.removeListener(preferenceHandler);
    }
    if (navigator.connection?.removeEventListener && preferenceHandler) {
        navigator.connection.removeEventListener('change', preferenceHandler);
    }
    if (pageHideHandler) window.removeEventListener('pagehide', pageHideHandler);
    pageHideHandler = null;
    preferenceHandler = null;
    motionPreference = null;
}

function handlePageShow(event) {
    if (event.persisted) initMotion();
}

/** Optional, single-entry GSAP setup. Repeated calls do not duplicate listeners/triggers. */
export function initMotion() {
    if (started) return;

    started = true;
    startupTime = performance.now();
    motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    preferenceHandler = handlePreferenceChange;
    if (motionPreference.addEventListener) motionPreference.addEventListener('change', preferenceHandler);
    else motionPreference.addListener(preferenceHandler);
    navigator.connection?.addEventListener?.('change', preferenceHandler);

    pageHideHandler = teardownPage;
    window.addEventListener('pagehide', pageHideHandler, { once: true });
    if (!pageShowHandler) {
        pageShowHandler = handlePageShow;
        window.addEventListener('pageshow', pageShowHandler);
    }

    handlePreferenceChange();
}
