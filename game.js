// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Physics World
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Earth gravity

// Ground
const groundBody = new CANNON.Body({
    type: CANNON.Body.STATIC,
    shape: new CANNON.Plane(),
    position: new CANNON.Vec3(0, 0, 0)
});
world.addBody(groundBody);

// Bulldozer Body
const bulldozer = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1, 3),
    new THREE.MeshStandardMaterial({ color: "yellow" })
);
bulldozer.position.set(0, 1, 0);
scene.add(bulldozer);

// Bulldozer Physics
const bulldozerBody = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Box(new CANNON.Vec3(1, 0.5, 1.5)),
    position: new CANNON.Vec3(0, 1, 0)
});
world.addBody(bulldozerBody);

// Drills
const drillLeft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.1, 1, 10),
    new THREE.MeshStandardMaterial({ color: "gray" })
);
drillLeft.position.set(-1, 0.5, 2);
bulldozer.add(drillLeft);

const drillRight = drillLeft.clone();
drillRight.position.set(1, 0.5, 2);
bulldozer.add(drillRight);

// Satellite (Target)
const satellite = new THREE.Mesh(
    new THREE.SphereGeometry(2, 32, 32),
    new THREE.MeshStandardMaterial({ color: "red" })
);
satellite.position.set(0, 10, -20);
scene.add(satellite);

const satelliteBody = new CANNON.Body({
    mass: 50,
    shape: new CANNON.Sphere(2),
    position: new CANNON.Vec3(0, 10, -20)
});
world.addBody(satelliteBody);

// Create Floating Text for Muzib Satellite
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
    const textGeometry = new THREE.TextGeometry("Muzib Satellite", {
        font: font,
        size: 1,
        height: 0.1
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    
    textMesh.position.set(-4, 12, -20); // Position text above the satellite
    scene.add(textMesh);
});

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Controls
let moveForward = false;
let moveBackward = false;
let drillActive = false;

window.addEventListener("keydown", (event) => {
    if (event.key === "w") moveForward = true;
    if (event.key === "s") moveBackward = true;
    if (event.key === "d") drillActive = true;
});

window.addEventListener("keyup", (event) => {
    if (event.key === "w") moveForward = false;
    if (event.key === "s") moveBackward = false;
    if (event.key === "d") drillActive = false;
});

// Game Loop
function animate() {
    requestAnimationFrame(animate);

    // Physics Update
    world.step(1 / 60);

    // Bulldozer Movement
    if (moveForward) bulldozerBody.position.z -= 0.2;
    if (moveBackward) bulldozerBody.position.z += 0.2;

    // Drill Mechanics
    if (drillActive) {
        satelliteBody.position.y -= 0.1; // Damage effect
        drillLeft.rotation.z += 0.5;
        drillRight.rotation.z += 0.5;
    }

    // Sync Graphics with Physics
    bulldozer.position.copy(bulldozerBody.position);
    bulldozer.quaternion.copy(bulldozerBody.quaternion);
    satellite.position.copy(satelliteBody.position);

    // Render
    renderer.render(scene, camera);
}

animate();