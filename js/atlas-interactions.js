const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(min-width: 1024px) and (pointer: fine) and (hover: hover)');

export function initAtlasInteractions() {
    const progress = document.querySelector('.atlas-scroll-progress__fill');
    const chapters = [...document.querySelectorAll('main > section[id] .atlas-chapter')];
    const lightTargets = [...document.querySelectorAll('.hero-visual, .project-illustration')];
    let frame = 0;
    let observer;
    let active = true;

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
    const clearCurrent = () => document.querySelectorAll('.atlas-index.is-current').forEach(node => node.classList.remove('is-current'));
    const setCurrent = entry => {
        if (!entry.isIntersecting) return;
        clearCurrent();
        entry.target.querySelector('.atlas-index')?.classList.add('is-current');
    };
    const observeChapters = () => {
        observer?.disconnect();
        if (!('IntersectionObserver' in window) || !chapters.length || !active) return;
        observer = new IntersectionObserver(entries => entries.forEach(setCurrent), {
            rootMargin: '-18% 0px -67% 0px', threshold: 0
        });
        chapters.forEach(chapter => observer.observe(chapter));
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
        observeChapters();
        bindLights();
        scheduleProgress();
    };

    updateProgress();
    window.addEventListener('scroll', scheduleProgress, { passive: true });
    window.addEventListener('resize', scheduleProgress, { passive: true });
    observeChapters();
    bindLights();
    finePointer.addEventListener('change', onPreferenceChange);
    reduceMotion.addEventListener('change', onPreferenceChange);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('pageshow', onPageShow);
}
