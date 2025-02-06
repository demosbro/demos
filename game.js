window.onload = function() {
    console.log("🚀 Game Loaded!");

    // ✅ Declare canon BEFORE using it
    let canon = {
        x: 100, 
        y: 300,
        shoot: function() {
            console.log("💥 Canon fired!");
        }
    };

    // ✅ Now we can safely use canon
    canon.shoot();
};
