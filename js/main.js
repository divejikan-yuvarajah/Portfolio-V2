
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initProjects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initNavigation();
    initProjects();

    // The 3D background is decorative. Load it independently so a CDN or
    // WebGL failure cannot prevent the portfolio's core interactions.
    import('./three-scene.js')
        .then(({ initThreeScene }) => initThreeScene())
        .catch(() => document.querySelector('#bg-canvas')?.remove());
});
