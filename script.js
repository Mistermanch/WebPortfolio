const player = document.getElementById("player")
const levels = document.querySelectorAll(".level")
const circleTransition = document.getElementById("circle-transition")
const svg = document.getElementById("connection-lines")

// Set initial player position at home
window.addEventListener('load', function() {
    const homeLevel = document.getElementById("home")
    player.style.left = homeLevel.offsetLeft + "px"
    player.style.top = homeLevel.offsetTop + "px"
    drawConnectionLines()
})

// Draw connection lines between home and other destinations
function drawConnectionLines() {
    const homeLevel = document.getElementById("home")
    const otherLevels = document.querySelectorAll(".level:not(#home)")
    
    // Clear existing lines
    svg.innerHTML = ""
    
    otherLevels.forEach(level => {
        // Get center positions of icons
        const fromX = homeLevel.offsetLeft + 32
        const fromY = homeLevel.offsetTop + 32
        const toX = level.offsetLeft + 32
        const toY = level.offsetTop + 32
        
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line")
        line.setAttribute("x1", fromX)
        line.setAttribute("y1", fromY)
        line.setAttribute("x2", toX)
        line.setAttribute("y2", toY)
        svg.appendChild(line)
    })
}

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