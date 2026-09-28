
import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initProjects } from './projects.js';

document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initAnimations();
    initNavigation();
    initProjects();

    console.log('Portfolio initialized.');
});
