const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (hover: hover)');

/** Update only the decorative Observatory state; project filtering owns hidden/ARIA state. */
export function setAtlasObservatoryProject(slug) {
    const stage = document.querySelector('[data-project-observatory]');
    if (!stage || !slug) return;
    const story = [...stage.querySelectorAll('.project-card--featured')]
        .find(card => card.dataset.caseStudySlug === slug && !card.hidden && !card.closest('[hidden]'));
    if (!story) return;
    stage.dataset.activeProject = slug;
    stage.querySelectorAll('[data-observatory-scene]').forEach(scene => {
        scene.classList.toggle('is-active', scene.dataset.observatoryScene === slug);
    });
    stage.querySelectorAll('[data-observatory-index]').forEach(index => {
        index.classList.toggle('is-active', index.dataset.observatoryIndex === slug);
    });
    const order = [...stage.querySelectorAll('[data-observatory-index]')]
        .findIndex(index => index.dataset.observatoryIndex === slug) + 1;
    const title = story.querySelector('h4')?.textContent.trim() || '';
    const titleTarget = stage.querySelector('[data-observatory-title]');
    const countTarget = stage.querySelector('[data-observatory-count]');
    if (titleTarget) titleTarget.textContent = title;
    if (countTarget) countTarget.textContent = `${String(order).padStart(2, '0')} / 04`;
}

export function initAtlasInteractions() {
    const progress = document.querySelector('.atlas-scroll-progress__fill');
    const sections = [...document.querySelectorAll('main > section[id]')];
    const systemRail = document.querySelector('[data-system-rail]');
    const railLinks = [...(systemRail?.querySelectorAll('a[href^="#"]') || [])];
    const lightTargets = [...document.querySelectorAll('.hero-visual, .observatory-stage')];
    let frame = 0;
    let observer;
    let active = true;
    const observatory = document.querySelector('[data-project-observatory]');
    const syncObservatory = () => {
        const selected = [...(observatory?.querySelectorAll('.project-card--featured') || [])]
            .find(card => !card.hidden && !card.closest('[hidden]'));
        if (selected) setAtlasObservatoryProject(selected.dataset.caseStudySlug);
    };
    const onFilter = () => syncObservatory();

    const updateProgress = () => {
        frame = 0;
        if (!progress || !active) return;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
        progress.style.transform = `scaleX(${ratio})`;
    };
    const scheduleProgress = () => {
        if (!frame && active) frame = window.requestAnimationFrame(updateProgress);
    };
    const clearCurrent = () => {
        document.querySelectorAll('.atlas-index.is-current').forEach(node => node.classList.remove('is-current'));
        railLinks.forEach(link => link.removeAttribute('aria-current'));
    };
    const setCurrent = entries => {
        const visible = entries.filter(entry => entry.isIntersecting);
        if (!visible.length) return;
        const current = visible.sort((a, b) => {
            const center = window.innerHeight / 2;
            const distance = entry => Math.abs((entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2 - center);
            return distance(a) - distance(b);
        })[0].target;
        clearCurrent();
        current.querySelector('.atlas-index')?.classList.add('is-current');
        systemRail?.querySelector(`a[href="#${CSS.escape(current.id)}"]`)?.setAttribute('aria-current', 'location');
    };
    const observeSections = () => {
        observer?.disconnect();
        if (!('IntersectionObserver' in window) || !sections.length || !active) return;
        observer = new IntersectionObserver(setCurrent, {
            rootMargin: '-42% 0px -42% 0px', threshold: 0
        });
        sections.forEach(section => observer.observe(section));
    };
    const onPointerMove = event => {
        if (!active || reduceMotion.matches) return;
        const target = event.currentTarget;
        const bounds = target.getBoundingClientRect();
        target.style.setProperty('--atlas-spot-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
        target.style.setProperty('--atlas-spot-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
    };
    const clearSpot = event => {
        event.currentTarget.style.removeProperty('--atlas-spot-x');
        event.currentTarget.style.removeProperty('--atlas-spot-y');
    };
    const bindLights = () => {
        lightTargets.forEach(target => {
            target.removeEventListener('pointermove', onPointerMove);
            target.removeEventListener('pointerleave', clearSpot);
            if (finePointer.matches && !reduceMotion.matches) {
                target.addEventListener('pointermove', onPointerMove, { passive: true });
                target.addEventListener('pointerleave', clearSpot, { passive: true });
            } else {
                target.style.removeProperty('--atlas-spot-x');
                target.style.removeProperty('--atlas-spot-y');
            }
        });
    };
    const onPreferenceChange = () => bindLights();
    const onPageHide = () => {
        active = false;
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        observer?.disconnect();
        window.removeEventListener('scroll', scheduleProgress);
        window.removeEventListener('resize', scheduleProgress);
        finePointer.removeEventListener('change', onPreferenceChange);
        reduceMotion.removeEventListener('change', onPreferenceChange);
        document.removeEventListener('portfolio:projects-filtered', onFilter);
        lightTargets.forEach(target => {
            target.removeEventListener('pointermove', onPointerMove);
            target.removeEventListener('pointerleave', clearSpot);
            clearSpot({ currentTarget: target });
        });
        clearCurrent();
    };
    const onPageShow = () => {
        if (active) return;
        active = true;
        window.addEventListener('scroll', scheduleProgress, { passive: true });
        window.addEventListener('resize', scheduleProgress, { passive: true });
        finePointer.addEventListener('change', onPreferenceChange);
        reduceMotion.addEventListener('change', onPreferenceChange);
        document.addEventListener('portfolio:projects-filtered', onFilter);
        observeSections();
        bindLights();
        scheduleProgress();
    };

    updateProgress();
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress, { passive: true });
    observeSections();
    bindLights();
    syncObservatory();
    finePointer.addEventListener('change', onPreferenceChange);
    reduceMotion.addEventListener('change', onPreferenceChange);
    document.addEventListener('portfolio:projects-filtered', onFilter);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);
}
