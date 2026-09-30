/** Decorative Atlas micro-choreography. Called only inside motion.js's existing matchMedia context. */
export function buildAtlasPolishMotion(gsap, canEnter) {
    const makeEntrance = (targets, vars, start = 'top 88%') => {
        const { start: triggerStart, ...tweenVars } = vars;
        document.querySelectorAll(targets).forEach(target => {
            if (!canEnter(target)) return;
            gsap.from(target, {
                ...tweenVars,
                duration: tweenVars.duration ?? .6,
                ease: 'power3.out',
                clearProps: 'transform',
                scrollTrigger: { trigger: target, start: triggerStart ?? start, once: true }
            });
        });
    };

    // The coordinator owns chapter rules/titles, the Observatory and Hero masks.
    makeEntrance('main > section[id] .atlas-index', { y: 8, scale: .92, duration: .45 });
    makeEntrance('.venture-company', { x: -12, duration: .65 });
}
