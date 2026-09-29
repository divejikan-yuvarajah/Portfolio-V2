let motionStart;

/** Start optional motion without coupling core page initialization to its CDN. */
export function initAnimations() {
    if (!motionStart) {
        motionStart = import('./motion.js')
            .then(({ initMotion }) => initMotion())
            .catch(() => {
                // Motion is decorative; static content and core interactions remain available.
                document.documentElement.classList.remove('motion-enhanced');
            });
    }

    return motionStart;
}
