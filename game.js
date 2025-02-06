// ✅ Game Variables
let canvas, ctx;
let bulldozer, satellite;
let score = 0;

// ✅ Load Game on Window Load
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");

    // ✅ Initialize Objects
    bulldozer = { x: 50, y: 250, width: 80, height: 40, speed: 5 };
    satellite = { x: 400, y: 200, width: 100, height: 60 };

    // ✅ Start Game Loop
    setInterval(updateGame, 30);
};

// ✅ Update Game (Runs Every 30ms)
function updateGame() {
    // 🔥 Clear Screen
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

// ✅ Destroy Satellite & Respawn
function destroySatellite() {
    score++; // Add Point
    satellite.x = Math.random() * (canvas.width - 100) + 100; // New Position
    satellite.y = Math.random() * (canvas.height - 60);
}

// ✅ Control Bulldozer
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && bulldozer.y > 0) bulldozer.y -= bulldozer.speed;
    if (event.key === "ArrowDown" && bulldozer.y < canvas.height - bulldozer.height) bulldozer.y += bulldozer.speed;
    if (event.key === "ArrowLeft" && bulldozer.x > 0) bulldozer.x -= bulldozer.speed;
    if (event.key === "ArrowRight" && bulldozer.x < canvas.width - bulldozer.width) bulldozer.x += bulldozer.speed;
});
