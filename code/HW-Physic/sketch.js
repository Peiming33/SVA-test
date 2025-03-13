let Engine = Matter.Engine,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies,
    World = Matter.World;

let engine, world;
let overAllTexture;

let softBodies = [];

function setup() {
    createCanvas(1000, 800);

 overAllTexture = createGraphics(width, height);
    overAllTexture.loadPixels();
    for (var i = 0; i < width + 50; i++) {
        for (var o = 0; o < height + 50; o++) {
            overAllTexture.set(i, o, color(100, noise(i / 3, o / 3, i * o / 50) * random([0, 30, 60])));
        }
    }
    overAllTexture.updatePixels();



    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.99998;

    //mouse control
    let mouse = Mouse.create(canvas.elt);
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.9 }
    });
    World.add(world, mouseConstraint);

    //add walls
    World.add(world, [
        Bodies.rectangle(width / 2, height + 50, width + 100, 100, { isStatic: true }),
        Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true }),
        Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true }),
        Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true })
    ]);

    //create
    createSoftBody(0, 400);
    createSoftBody(200, 400);
    createSoftBody(500, 400);
    createSoftBody(700, 400);
    createSoftBody(250, 100);
    createSoftBody(450, 100);

    softBodies.forEach(sb => World.add(world, sb));
}

function createSoftBody(x, y) {
    let softBody = Composites.softBody(x, y, 5, 5, 5, 5, true, 20, {
        friction: 0.01,
        frictionAir: 0.025,
        density: 0.5,
        restitution: 1,
        render: { fillStyle: '#f1c885' }
    });

    softBodies.push(softBody);
}

function draw() {
    background(255);
    Engine.update(engine);

    fill('#f1c885');
    stroke('#f1c885');
    strokeWeight(27.5);

    softBodies.forEach(sb => {
        sb.bodies.forEach((body) => {
            ellipse(body.position.x, body.position.y, 30);
        });
    });

    noStroke();
    fill(100);
    textAlign(CENTER);
    textSize(35);
    text("🍪 Drag the cookies to interact with them! 🍪", width / 2, 100);

   push();
    blendMode(MULTIPLY);
    image(overAllTexture, 0, 0);
    pop();

}
