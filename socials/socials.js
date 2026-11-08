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
const bodies = [];
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
            restitution: 0.98,
            friction: 0,
            frictionAir: 0.002,
        }
    );

    const angle = (index / balls.length) * Math.PI * 2;
    Body.setVelocity(body, {
        x: Math.cos(angle) * 2.5,
        y: Math.sin(angle) * 2.5
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
        Bodies.rectangle(width / 2, -20, width, 40, { isStatic: true }),
        Bodies.rectangle(width / 2, height + 20, width, 40, { isStatic: true }),
        Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true }),
        Bodies.rectangle(width + 20, height / 2, 40, height, { isStatic: true })
    ];
    Composite.add(engine.world, walls);

    bodies.forEach(({ body, radius }) => {
        Body.setPosition(body, {
            x: Math.max(radius, Math.min(width - radius, body.position.x)),
            y: Math.max(radius, Math.min(height - radius, body.position.y))
        });
    });
}

updateWalls();

const mouse = Mouse.create(playground);

const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
});

Composite.add(engine.world, mouseConstraint);

let dragging = false;

Events.on(mouseConstraint, "startdrag", () => {
    dragging = true;
});

Events.on(mouseConstraint, "enddrag", () => {
    setTimeout(() => {
        dragging = false;
    }, 50);
});

balls.forEach(ball => {
    ball.addEventListener("click", event => {
        if (dragging) {
            event.preventDefault();
        }
    });
});

let lastMotionCheck = 0;
Events.on(engine, "beforeUpdate", event => {
    if (event.timestamp - lastMotionCheck < 1000) return;
    lastMotionCheck = event.timestamp;

    bodies.forEach(({ body }) => {
        if (mouseConstraint.body === body) return;
        const speed = Math.hypot(body.velocity.x, body.velocity.y);
        if (speed < 1.2) {
            const angle = Math.random() * Math.PI * 2;
            Body.setVelocity(body, {
                x: Math.cos(angle) * 2.5,
                y: Math.sin(angle) * 2.5
            });
        }
    });
});

Events.on(engine, "afterUpdate", () => {
    bodies.forEach(({ body, element }) => {
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

const runner = Runner.create();
Runner.run(runner, engine);
