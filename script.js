const player = document.getElementById("player")
const levels = document.querySelectorAll(".level")

levels.forEach(level => {
    level.addEventListener("click", function(e) {
        e.preventDefault();

        player.style.left = level.offsetLeft + "px";
        player.style.top  = (level.offsetTop - 50) + "px";

        setTimeout(() => {
            if (level.href) {
                window.location.href = level.href;
            }
        }, 500);
    });
});