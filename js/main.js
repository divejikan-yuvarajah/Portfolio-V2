
import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initAnimations();
    initNavigation();

    console.log('Portfolio initialized.');
});
