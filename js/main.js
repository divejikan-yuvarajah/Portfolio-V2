
import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';

document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initAnimations();
    initNavigation();
    initProjects();
    initContact();

    console.log('Portfolio initialized.');
});
