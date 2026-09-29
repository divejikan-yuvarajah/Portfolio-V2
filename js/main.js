import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    initNavigation();
    initProjects();
    initContact();

    // Keep the decorative 3D scene optional so CDN or WebGL failures do not block core interactions.
    import('./three-scene.js')
        .then(({ initThreeScene }) => initThreeScene())
        .catch(() => document.querySelector('#bg-canvas')?.remove());
});
