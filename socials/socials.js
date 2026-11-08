const {
    Engine,
    Runner,
    Bodies,
    Composite,
    Body,
    Mouse,
    MouseConstraint,
    Events
} = Matter;

const playground = document.getElementById("playground");
const engine = Engine.create();
engine.world.gravity.y = 0;
const balls = document.querySelectorAll(".ball");
const initialSpeed = 2.5;
const maxThrowSpeed = 12;
const bodies = [];
const launchedBodies = new Set();
let walls = [];
let width = playground.clientWidth;
let height = playground.clientHeight;

balls.forEach((ball, index) => {
    const radius = ball.offsetWidth / 2;
    const columns = Math.max(1, Math.floor(width / (radius * 2 + 14)));
    const rows = Math.ceil(balls.length / columns);
    const row = Math.floor(index / columns);
    const column = index % columns;
    const ballsInRow = Math.min(columns, balls.length - row * columns);
    const x = width * (column + 1) / (ballsInRow + 1);
    const y = height * (row + 1) / (rows + 1);
    const body = Bodies.circle(
        x,
        y,
        radius,
        {
            restitution: 1,
            friction: 0,
            frictionAir: 0,
        }
    );

    const angle = (index / balls.length) * Math.PI * 2;
    Body.setVelocity(body, {
        x: Math.cos(angle) * initialSpeed,
        y: Math.sin(angle) * initialSpeed
    });
    Composite.add(engine.world, body);

    bodies.push({
        body,
        element: ball,
        radius,
    });
});

function updateWalls() {
    Composite.remove(engine.world, walls);
    width = playground.clientWidth;
    height = playground.clientHeight;
    walls = [
        Bodies.rectangle(width / 2, -20, width, 40, { isStatic: true, restitution: 1, friction: 0 }),
        Bodies.rectangle(width / 2, height + 20, width, 40, { isStatic: true, restitution: 1, friction: 0 }),
        Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true, restitution: 1, friction: 0 }),
        Bodies.rectangle(width + 20, height / 2, 40, height, { isStatic: true, restitution: 1, friction: 0 })
    ];
    Composite.add(engine.world, walls);

    bodies.forEach(({ body, radius }) => {
        Body.setPosition(body, {
            x: Math.max(radius, Math.min(width - radius, body.position.x)),
            y: Math.max(radius, Math.min(height - radius, body.position.y))
        });
    });
}

function capSpeed(body) {
    const speed = Math.hypot(body.velocity.x, body.velocity.y);
    if (speed > initialSpeed) {
        Body.setVelocity(body, {
            x: body.velocity.x * initialSpeed / speed,
            y: body.velocity.y * initialSpeed / speed
        });
    }
}

updateWalls();

const mouse = Mouse.create(playground);

const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 0.5,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

let pointerStart = null;
let draggedBall = null;
let pointerSamples = [];
let didDragGesture = false;

function recordPointerPosition(event) {
    const now = performance.now();
    pointerSamples.push({ x: event.clientX, y: event.clientY, time: now });
    pointerSamples = pointerSamples.filter(sample => now - sample.time <= 100);
}

playground.addEventListener("pointerdown", event => {
    const ball = event.target.closest(".ball");
    pointerStart = ball ? { x: event.clientX, y: event.clientY, ball } : null;
    draggedBall = null;
    didDragGesture = false;
    pointerSamples = [];
    if (pointerStart) recordPointerPosition(event);
});

window.addEventListener("pointermove", event => {
    if (!pointerStart) return;
    recordPointerPosition(event);

    const distance = Math.hypot(
        event.clientX - pointerStart.x,
        event.clientY - pointerStart.y
    );
    if (distance > 6) {
        draggedBall = pointerStart.ball;
        didDragGesture = true;
    }
});

Events.on(mouseConstraint, "enddrag", ({ body }) => {
    if (!didDragGesture || !body) return;
    didDragGesture = false;

    const start = pointerSamples[0];
    const end = pointerSamples[pointerSamples.length - 1];
    if (start && end && end.time > start.time) {
        const elapsed = end.time - start.time;
        const deltaX = end.x - start.x;
        const deltaY = end.y - start.y;
        const gestureSpeed = Math.hypot(deltaX, deltaY) / elapsed * 16.67 * 0.6;
        const speed = Math.min(maxThrowSpeed, Math.max(initialSpeed, gestureSpeed));
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 0) {
            Body.setVelocity(body, {
                x: deltaX / distance * speed,
                y: deltaY / distance * speed
            });
            launchedBodies.add(body);
        }
    }

    pointerSamples = [];
});

window.addEventListener("pointerup", () => {
    pointerStart = null;
    if (draggedBall) {
        setTimeout(() => {
            draggedBall = null;
        }, 0);
    }
});

playground.addEventListener("click", event => {
    if (event.target.closest(".ball") === draggedBall) {
        event.preventDefault();
        draggedBall = null;
    }
}, true);

balls.forEach(ball => {
    ball.setAttribute("draggable", "false");
});

Events.on(engine, "beforeUpdate", () => {
    bodies.forEach(({ body }) => {
        if (mouseConstraint.body === body) return;

        if (launchedBodies.has(body)) {
            const speed = Math.hypot(body.velocity.x, body.velocity.y);
            if (speed > initialSpeed) {
                const reducedSpeed = Math.max(initialSpeed, speed * 0.98);
                Body.setVelocity(body, {
                    x: body.velocity.x * reducedSpeed / speed,
                    y: body.velocity.y * reducedSpeed / speed
                });
            } else {
                launchedBodies.delete(body);
                capSpeed(body);
            }
        } else {
            capSpeed(body);
        }
    });
});

Events.on(engine, "afterUpdate", () => {
    bodies.forEach(({ body, element }) => {
        if (mouseConstraint.body !== body && !launchedBodies.has(body)) capSpeed(body);
        element.style.left = `${body.position.x}px`;
        element.style.top = `${body.position.y}px`;
        element.style.transform = "translate(-50%, -50%)";
    });
});

let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateWalls, 100);
});

playground.classList.add("physics-enabled");
const runner = Runner.create();
Runner.run(runner, engine);
