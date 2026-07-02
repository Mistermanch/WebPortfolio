const {
    Engine,
    Render,
    Runner,
    Bodies,
    Composite,
    Mouse,
    MouseConstraint,
    Events
} = Matter;

const playground = document.getElementById("playground");

const width = playground.clientWidth;
const height = playground.clientHeight;

const engine = Engine.create();

engine.world.gravity.y = 0;

const balls = document.querySelectorAll(".ball");

const bodies = [];

balls.forEach((ball, index)=>{
    const body = Bodies.circle(
        150 + index * 120,
        150,
        45,
        {
            restitution:0.95,
            friction:0.01,
            frictionAir:0.01,
        }
    );

    Composite.add(engine.world, body);

    bodies.push({
        body:body,
        element: ball,
    });
});

const walls = [
    Bodies.rectangle(width / 2, -20, width, 40, { isStatic: true }),
    Bodies.rectangle(width / 2, height + 20, width, 40, { isStatic: true }),
    Bodies.rectangle(-20, height / 2, 40, height, { isStatic: true }),
    Bodies.rectangle(width + 20, height / 2, 40, height, { isStatic: true })
];

Composite.add(engine.world,walls);

const mouse=Mouse.create(playground);

const mouseConstraint=MouseConstraint.create(engine,{
    mouse:mouse,

    constraint:{
        stiffness:0.2,
        render:{
            visible:false
        }
    }
});

Composite.add(engine.world,mouseConstraint);

let dragging=false;

Events.on(mouseConstraint,"startdrag",()=>{
    dragging=true;
});

Events.on(mouseConstraint,"enddrag",()=>{
    setTimeout(()=>{
        dragging=false;
    },50);
});

balls.forEach(ball=> {
    ball.addEventListener("click",(e)=>{
        if(dragging){
            e.preventDefault();
        }
    });
});

Events.on(engine,"afterUpdate",()=>{
    bodies.forEach(({body, element}) => {
        element.style.left =`${body.position.x}px`;

        element.style.top =`${body.position.y}px`;

        element.style.transform="translate(-50%,-50%)";
    });
});

const runner = Runner.create();
Runner.run(engine);
