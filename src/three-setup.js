import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

export function setupThree(sceneCallback) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer));

    const light = new THREE.HemisphereLight(0xffffff, 0x444444);
    scene.add(light);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load('public/realistic_human_heart.glb', (gltf) => {
        const heart = gltf.scene;
        heart.scale.set(0.1, 0.1, 0.1);
        scene.add(heart);

        // Position update callback
        sceneCallback(heart);
    });

    function animate() {
        renderer.setAnimationLoop(() => {
            renderer.render(scene, camera);
        });
    }
    animate();

    return { scene, camera, renderer };
}
