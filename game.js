// ✅ Define canon at the top before using it
let canon = {
    x: 100, // Example position
    y: 300,
    shoot: function() {
        console.log("💥 Canon fired!");
    }
};

// ✅ Ensure the game runs after the page loads
window.onload = function() {
    console.log("🚀 Game Loaded!");

    // ✅ Check if canon is working
    if (canon) {
        canon.shoot(); // Should log "Canon fired!"
    } else {
        console.error("❌ Error: canon is not defined!");
    }
};
