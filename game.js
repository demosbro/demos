// ✅ No import needed, Three.js is loaded globally from index.html
let scene, camera, renderer;
let bulldozer, drills = [], satellite;

function init() {
    // ✅ Create Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue

    // ✅ Create Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    // ✅ Create Renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // ✅ Create Bulldozer Body
    let bulldozerBody = new THREE.BoxGeometry(2, 1, 3);
    let bulldozerMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
    bulldozer = new THREE.Mesh(bulldozerBody, bulldozerMaterial);
    bulldozer.position.set(0, 0, 0);
    scene.add(bulldozer);

    // ✅ Create Bulldozer Drills
    let drillGeometry = new THREE.CylinderGeometry(0.3, 0.1, 2, 8);
    let drillMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });

    let drillLeft = new THREE.Mesh(drillGeometry, drillMaterial);
    drillLeft.position.set(-1.2, -0.5, 1.5);
    drillLeft.rotation.z = Math.PI / 2;
    scene.add(drillLeft);

    let drillRight = new THREE.Mesh(drillGeometry, drillMaterial);
    drillRight.position.set(1.2, -0.5, 1.5);
    drillRight.rotation.z = Math.PI / 2;
    scene.add(drillRight);

    drills = [drillLeft, drillRight];

    // ✅ Create Muzib Satellite
    let satelliteGeometry = new THREE.SphereGeometry(1, 16, 16);
    let satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
    satellite = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
    satellite.position.set(0, 3, -5);
    scene.add(satellite);

    // ✅ Add Lighting
    let light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 7);
    scene.add(light);

    // ✅ Start Animation
    animate();
}

// ✅ Bulldozer Movement Controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') bulldozer.position.z -= 0.2;
    if (event.key === 'ArrowDown') bulldozer.position.z += 0.2;
    if (event.key === 'ArrowLeft') bulldozer.position.x -= 0.2;
    if (event.key === 'ArrowRight') bulldozer.position.x += 0.2;

    // ✅ Check for Collision with Satellite
    let distance = bulldozer.position.distanceTo(satellite.position);
    if (distance < 1.5) {
        destroySatellite();
    }
});

// ✅ Destroy Satellite Function
function destroySatellite() {
    scene.remove(satellite); // Remove satellite from scene
    console.log("💥 Muzib Satellite Destroyed!");
}

// ✅ Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    // ✅ Rotate Drills
    drills.forEach(drill => {
        drill.rotation.y += 0.1;
    });

    renderer.render(scene, camera);
}

// ✅ Start the Game
window.onload = init;
