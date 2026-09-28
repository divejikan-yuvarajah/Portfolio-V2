
export function initAnimations() {
   
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    const fadeElements = document.querySelectorAll('.fade-in');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!('IntersectionObserver' in window) || reducedMotion) {
        fadeElements.forEach((element) => element.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                activeObserver.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.documentElement.classList.add('motion-effects-enabled');
    fadeElements.forEach((element) => observer.observe(element));
}
