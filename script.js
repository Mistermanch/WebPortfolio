const player = document.getElementById("player");
const levels = document.querySelectorAll(".level");

// Set initial player position at home
window.addEventListener("load", function () {
    const homeLevel = document.getElementById("home");

    player.style.left = homeLevel.offsetLeft + "px";
    player.style.top = homeLevel.offsetTop + "px";
});

levels.forEach(level => {
    level.addEventListener("click", function (e) {

        // Don't prevent default for home
        if (level.id === "home") {
            return;
        }

        e.preventDefault();

        // Move player
        player.style.left = level.offsetLeft + "px";
        player.style.top = level.offsetTop + "px";

        // Navigate after the animation
        setTimeout(() => {
            window.location.href = level.href;
        }, 1200);

    });
});