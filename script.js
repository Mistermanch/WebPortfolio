const player = document.getElementById("player")
const levels = document.querySelectorAll(".level")
const circleTransition = document.getElementById("circle-transition")
const svg = document.getElementById("connection-lines")

// Initial player position at home
let currentLevel = document.getElementById("home")

// Draw connection lines between home and other destinations
function drawConnectionLines() {
    const homeLevel = document.getElementById("home")
    const otherLevels = document.querySelectorAll(".level:not(#home)")
    
    // Clear existing lines
    svg.innerHTML = ""
    
    otherLevels.forEach(level => {
        const fromX = homeLevel.offsetLeft + 32 // Center of icon
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

// Draw lines on load
drawConnectionLines()

levels.forEach(level => {
    level.addEventListener("click", function(e) {
        e.preventDefault()
        
        // Skip if clicking on home or if already at home
        if (level.id === "home" || !level.href) {
            return
        }

        // Animate player to destination
        player.style.left = (level.offsetLeft + 32 - 20) + "px"
        player.style.top  = (level.offsetTop - 50) + "px"

        // Circle transition and navigation
        setTimeout(() => {
            circleTransition.classList.add("active")
            
            setTimeout(() => {
                if (level.href) {
                    window.location.href = level.href
                }
            }, 400)
        }, 1200) // Wait for player to reach destination
    })
})
