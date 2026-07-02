const player = document.getElementById("player")
const levels = document.querySelectorAll(".level")
const circleTransition = document.getElementById("circle-transition")

// Set initial player position at home
window.addEventListener('load', function() {
    const homeLevel = document.getElementById("home")
    player.style.left = homeLevel.offsetLeft + "px"
    player.style.top = homeLevel.offsetTop + "px"
})

levels.forEach(level => {
    level.addEventListener("click", function(e) {
        // Don't prevent default for home
        if (level.id === "home") {
            return
        }
        
        e.preventDefault()

        // Animate player to destination
        player.style.left = level.offsetLeft + "px"
        player.style.top = level.offsetTop + "px"

        // Circle transition and navigation
        setTimeout(() => {
            circleTransition.classList.add("active")
            
            setTimeout(() => {
                if (level.href && level.href !== "#") {
                    window.location.href = level.href
                }
            }, 400)
        }, 1200) // Wait for player to reach destination
    })
})
