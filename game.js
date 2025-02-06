// ✅ Game Variables
let canvas, ctx;
let bulldozer, satellite;
let score = 0;
let hitSound;
let speedMultiplier = 2; // 🔥 Increase Speed for Touch

// ✅ Load Game on Window Load
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    hitSound = document.getElementById("hitSound");

    // ✅ Initialize Objects
    bulldozer = { x: 50, y: 250, width: 80, height: 40, speed: 5 };
    satellite = { x: 400, y: 200, width: 100, height: 60 };

    // ✅ Add Mobile Touch Controls (🔥 Faster Response)
    document.getElementById("up").ontouchstart = () => moveBulldozer("up");
    document.getElementById("down").ontouchstart = () => moveBulldozer("down");
    document.getElementById("left").ontouchstart = () => moveBulldozer("left");
    document.getElementById("right").ontouchstart = () => moveBulldozer("right");

    // ✅ Start Game Loop
    setInterval(updateGame, 20); // 🔥 Faster Game Loop
};

// ✅ Update Game (Runs Every 20ms)
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 🎨 Draw Bulldozer
    ctx.fillStyle = "yellow";
    ctx.fillRect(bulldozer.x, bulldozer.y, bulldozer.width, bulldozer.height);
    ctx.fillStyle = "black";
    ctx.fillText("🚜", bulldozer.x + 20, bulldozer.y + 25);

    // 🎨 Draw Muzib Satellite
    ctx.fillStyle = "gray";
    ctx.fillRect(satellite.x, satellite.y, satellite.width, satellite.height);
    ctx.fillStyle = "black";
    ctx.fillText("Muzib Satellite", satellite.x + 10, satellite.y + 35);

    // 🎯 Check for Collision
    if (
        bulldozer.x + bulldozer.width > satellite.x &&
        bulldozer.x < satellite.x + satellite.width &&
        bulldozer.y + bulldozer.height > satellite.y &&
        bulldozer.y < satellite.y + satellite.height
    ) {
        destroySatellite();
    }

    // 🏆 Draw Score
    ctx.fillStyle = "black";
    ctx.fillText("Mujib CDI: " + score, 10, 20);
}

// ✅ Move Bulldozer (Arrow Keys & Touch)
document.addEventListener("keydown", function (event) {
    moveBulldozer(event.key.replace("Arrow", "").toLowerCase());
});

// ✅ Move Bulldozer (For Mobile & PC)
function moveBulldozer(direction) {
    let moveSpeed = bulldozer.speed * speedMultiplier; // 🔥 Faster Movement
    if (direction === "up" && bulldozer.y > 0) bulldozer.y -= moveSpeed;
    if (direction === "down" && bulldozer.y < canvas.height - bulldozer.height) bulldozer.y += moveSpeed;
    if (direction === "left" && bulldozer.x > 0) bulldozer.x -= moveSpeed;
    if (direction === "right" && bulldozer.x < canvas.width - bulldozer.width) bulldozer.x += moveSpeed;
}

// ✅ Destroy Satellite & Respawn (Plays Sound)
function destroySatellite() {
    score++; // Add Point
    hitSound.play(); // 🔊 Play Sound
    satellite.x = Math.random() * (canvas.width - 100) + 100; // New Position
    satellite.y = Math.random() * (canvas.height - 60);
}
