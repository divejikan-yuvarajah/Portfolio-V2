
import * as THREE from 'three';

export function initThreeScene() {
    const canvas = document.querySelector('#bg-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

 
    const particleCount = 100; 
    const connectDistance = 6;  
    const particleSpeed = 0.05; 
    const interactionRadius = 8; 
    const colorPrimary = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-action-primary')
        .trim();
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionPreference.matches;
    let animationFrameId = null;

 
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = []; 


    for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 40;
        const y = (Math.random() - 0.5) * 40;
        const z = (Math.random() - 0.5) * 20;

        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;

        particleVelocities.push({
            x: (Math.random() - 0.5) * particleSpeed,
            y: (Math.random() - 0.5) * particleSpeed,
            z: (Math.random() - 0.5) * particleSpeed
        });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: colorPrimary,
        size: 0.15,
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    const maxConnections = (particleCount * (particleCount - 1)) / 2;
    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions = new Float32Array(maxConnections * 6); 

    linesGeometry.setAttribute('position', new THREE.BufferAttribute(linesPositions, 3));

    const linesMaterial = new THREE.LineBasicMaterial({
        color: colorPrimary,
        transparent: true,
        opacity: 0.2, 
        linewidth: 1
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

   
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });


    const clock = new THREE.Clock();

    function animate() {
        if (prefersReducedMotion) {
            animationFrameId = null;
            renderer.render(scene, camera);
            return;
        }

        animationFrameId = requestAnimationFrame(animate);

        const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const worldMouse = camera.position.clone().add(dir.multiplyScalar(distance));

        
        const positions = particlesGeometry.attributes.position.array;

        let lineVertexIndex = 0;

        for (let i = 0; i < particleCount; i++) {
 
            positions[i * 3] += particleVelocities[i].x;
            positions[i * 3 + 1] += particleVelocities[i].y;
            positions[i * 3 + 2] += particleVelocities[i].z;

            if (positions[i * 3] < -25 || positions[i * 3] > 25) particleVelocities[i].x *= -1;
            if (positions[i * 3 + 1] < -25 || positions[i * 3 + 1] > 25) particleVelocities[i].y *= -1;
            if (positions[i * 3 + 2] < -10 || positions[i * 3 + 2] > 10) particleVelocities[i].z *= -1;


            const dx = positions[i * 3] - worldMouse.x;
            const dy = positions[i * 3 + 1] - worldMouse.y;
            const distMouse = Math.sqrt(dx * dx + dy * dy);

            if (distMouse < interactionRadius) {

                const force = (interactionRadius - distMouse) / interactionRadius;
                positions[i * 3] += dx * force * 0.05;
                positions[i * 3 + 1] += dy * force * 0.05;
            }

            for (let j = i + 1; j < particleCount; j++) {
                const dx2 = positions[i * 3] - positions[j * 3];
                const dy2 = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz2 = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2);

                if (dist < connectDistance) {
                    linesPositions[lineVertexIndex++] = positions[i * 3];
                    linesPositions[lineVertexIndex++] = positions[i * 3 + 1];
                    linesPositions[lineVertexIndex++] = positions[i * 3 + 2];

                    linesPositions[lineVertexIndex++] = positions[j * 3];
                    linesPositions[lineVertexIndex++] = positions[j * 3 + 1];
                    linesPositions[lineVertexIndex++] = positions[j * 3 + 2];
                }
            }
        }

        particlesGeometry.attributes.position.needsUpdate = true;

        linesGeometry.setDrawRange(0, lineVertexIndex / 3);
        linesGeometry.attributes.position.needsUpdate = true;

        camera.position.x += (mouseX * 1 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 1 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    motionPreference.addEventListener('change', (event) => {
        prefersReducedMotion = event.matches;

        if (prefersReducedMotion && animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            renderer.render(scene, camera);
        } else if (!prefersReducedMotion && animationFrameId === null) {
            animate();
        }
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (prefersReducedMotion) renderer.render(scene, camera);
    });
}
