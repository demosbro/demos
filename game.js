// ✅ Game Variables
let canvas, ctx;
let bulldozer, satellite;
let score = 0;
let hitSound;
let moveDirection = null; 
let holdInterval; 

// ✅ Load Game on Window Load
window.onload = function () {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    hitSound = document.getElementById("hitSound");

    // ✅ Set Full-Screen Canvas
    resizeCanvas();

    // ✅ Initialize Objects
    bulldozer = { x: 50, y: canvas.height / 2, size: 80, speed: 5 };
    satellite = { x: canvas.width - 200, y: canvas.height / 2, size: 100 };

    // ✅ Add Mobile Controls
    addTouchControl("up", "up");
    addTouchControl("down", "down");
    addTouchControl("left", "left");
    addTouchControl("right", "right");

    // ✅ Start Game Loop
    setInterval(updateGame, 20);
};

// ✅ Resize Canvas to Full Screen
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// ✅ Touch Hold (Move Continuously)
function addTouchControl(buttonId, direction) {
    let button = document.getElementById(buttonId);
    
    button.ontouchstart = function (event) {
        event.preventDefault(); 
        moveDirection = direction;
        holdInterval = setInterval(() => moveBulldozer(direction), 50);
    };

    button.ontouchend = function () {
        moveDirection = null;
        clearInterval(holdInterval);
    };
}

// ✅ Update Game (Runs Every 20ms)
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "50px Arial";

    // 🎨 Draw Bulldozer (🚜)
    ctx.fillText("🚜", bulldozer.x, bulldozer.y + 40);

    // 🎨 Draw Muzib Satellite (🛰️)
    ctx.fillText("🛰️", satellite.x, satellite.y + 40);

    // 📢 Draw Muzib Satellite Name
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Muzib Satellite", satellite.x - 20, satellite.y + 90);

    // 🏆 Draw Score
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("Mujib CDI: " + score, 20, 40);

    // 🎯 Check for Collision
    if (
        bulldozer.x + bulldozer.size > satellite.x &&
        bulldozer.x < satellite.x + satellite.size &&
        bulldozer.y + bulldozer.size > satellite.y &&
        bulldozer.y < satellite.y + satellite.size
    ) {
        destroySatellite();
    }
}

// ✅ Move Bulldozer (Arrow Keys & Touch Hold)
document.addEventListener("keydown", function (event) {
    moveBulldozer(event.key.replace("Arrow", "").toLowerCase());
});

// ✅ Move Bulldozer
function moveBulldozer(direction) {
    let moveSpeed = bulldozer.speed;
    if (direction === "up" && bulldozer.y > 0) bulldozer.y -= moveSpeed;
    if (direction === "down" && bulldozer.y < canvas.height - bulldozer.size) bulldozer.y += moveSpeed;
    if (direction === "left" && bulldozer.x > 0) bulldozer.x -= moveSpeed;
    if (direction === "right" && bulldozer.x < canvas.width - bulldozer.size) bulldozer.x += moveSpeed;
}

// ✅ Destroy Satellite & Respawn (Plays Sound)
function destroySatellite() {
    score++;
    hitSound.play();
    satellite.x = Math.random() * (canvas.width - 200) + 100;
    satellite.y = Math.random() * (canvas.height - 100) + 50;
}
