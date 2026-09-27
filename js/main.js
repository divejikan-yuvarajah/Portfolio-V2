
import { initThreeScene } from './three-scene.js';
import { initAnimations } from './animations.js';
import { initSkills } from './skills.js';

document.addEventListener('DOMContentLoaded', () => {
    initThreeScene();
    initAnimations();
    initSkills();

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    console.log('Portfolio initialized.');
});
