import { setupBlazePose } from './pose.js';
import { setupThree } from './three-setup.js';

const videoElement = document.getElementById('webcam');

async function main() {
    const { scene, renderer } = setupThree((heart) => {
        // Update heart position based on keypoints
        window.updateHeartPosition = (keypoints) => {
            const chest = keypoints[11]; // Example: left shoulder
            heart.position.set(chest.x, chest.y, chest.z);
        };
    });

    setupBlazePose(videoElement, (results) => {
        const keypoints = results.poseWorldLandmarks;
        if (keypoints) {
            window.updateHeartPosition(keypoints);
        }
    });
}

main();
