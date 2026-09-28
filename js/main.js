
import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';
import { initSkills } from './skills.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initAnimations();
    initSkills();
    initNavigation();

    console.log('Portfolio initialized.');
});
