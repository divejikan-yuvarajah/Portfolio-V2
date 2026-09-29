import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initNavigation();
    initProjects();
    initContact();

    // The full-viewport particle field is desktop decoration. Avoid loading its
    // renderer on touch/small/short screens, reduced-motion and constrained links.
    const constrained = matchMedia('(pointer: coarse), (max-width: 760px), (max-height: 540px), (prefers-reduced-motion: reduce)').matches
        || navigator.connection?.saveData
        || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2);
    const canvas = document.querySelector('#bg-canvas');
    if (constrained) canvas?.remove();
    else {
        import('./three-scene.js')
            .then(({ initThreeScene }) => initThreeScene())
            .catch(() => canvas?.remove());
    }
});
