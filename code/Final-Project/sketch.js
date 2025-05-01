
// ml5 Teachable Machine
let classifier;
let imageModelURL = "model/";
let video, flippedVideo;
let label = "";
let lastDropTime = 0;
let lastLabel = "";
let minInterval = 4000; // 5s
let particles = [];
let bounceSound, scoreSound
let bgp,bgm
let lastBounceSoundTime = 0;
let bounceCooldown = 500
let score = {
  Kitty: 0,
  Bunny: 0,
  Butterfly: 0,
  Unicorn: 0,
  Piggy: 0,
  Puppy: 0,
};

// Import Matter.js modules
let Engine = Matter.Engine,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

let engine;
let world;
let balls = [];
let ground;
let mouseConstraint;

let jarImg
let finishButton;
let saveButton
let jarClosed = false; 
let plugImg;
// picture
let kittyImg,
  bunnyImg,
  butterflyImg,
  unicornImg,
  piggyImg,
  puppyImg,
  particleImg;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  kittyImg = loadImage("kitty.PNG");
  bunnyImg = loadImage("bunny.PNG");
  butterflyImg = loadImage("butterfly.PNG");
  unicornImg = loadImage("unicorn.PNG");
  piggyImg = loadImage("piggy.PNG");
  puppyImg = loadImage("puppy.PNG");
  particleImg = loadImage("particle1.png");
  jarImg = loadImage("jar.PNG");
  plugImg = loadImage("plug.PNG");
  buttonImg = loadImage("button.PNG")
  bgp = loadImage("bgp.png");
  bounceSound = loadSound('bounceSound.wav');
  scoreSound = loadSound('scoreSound.mp3')
  bgm = loadSound('bgm2.mp3')
  saveButtonImg = loadImage('button.PNG');
  finishButtonImg = loadImage('button.PNG')
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  textFont('cofo-sans-pixel')
  bgm.loop();
bgm.setVolume(0.2);


  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();

  engine = Engine.create();
  world = engine.world;

//Listen for when two objects collide, then play a bounce sound if cooldown time passed.
 Matter.Events.on(engine, 'collisionStart', function(event) {
  let now = millis();
  if (now - lastBounceSoundTime > bounceCooldown && bounceSound.isLoaded()) {
    bounceSound.play();
    lastBounceSoundTime = now;
  }
});

  let ground = Bodies.rectangle(width / 2, height - 10, width, 20, {
    isStatic: true,
  });
  let leftWall = Bodies.rectangle(10, height / 2, 20, height, {
    isStatic: true,
  });
  let rightWall = Bodies.rectangle(width - 10, height / 2, 20, height, {
    isStatic: true,
  });

  let jarX = width / 2;
  let jarY = height - 270;
  let jarWidth = 500;
  let jarHeight = 500;

  let jarLeftWall = Bodies.rectangle(
    jarX - jarWidth / 2 + 130,
    jarY + 45,
    20,
    jarHeight - 150,
    {
      isStatic: true,
    }
  );

  let jarRightWall = Bodies.rectangle(
    jarX + jarWidth / 2 - 130,
    jarY + 45,
    20,
    jarHeight - 150,
    {
      isStatic: true,
    }
  );

  let jarBottom = Bodies.rectangle(
    jarX,
    jarY + jarHeight / 2 - 20,
    jarWidth - 250,
    20,
    {
      isStatic: true,
    }
  );

  let jarTopLeft = Bodies.rectangle(jarX - 80, jarY - 170, 90, 10, {
    isStatic: true,
    angle: radians(-50),
  });

  let jarTopRight = Bodies.rectangle(jarX + 80, jarY - 170, 90, 10, {
    isStatic: true,
    angle: radians(50),
  });
  
  World.add(world, [
    ground, 
    leftWall, 
    rightWall,
    jarLeftWall,
    jarRightWall,
    jarBottom,
    jarTopLeft,
    jarTopRight,
  ]);

  let mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  let mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  World.add(world, mouseConstraint);
}

function draw() {
  background(255);
  image(bgp, 0, 0, width, height);

//define the position and size of the jar where items will fall into.
  let jarX = width / 2;
  let jarY = height - 270;
  let jarWidth = 500;
  let jarHeight = 500;
  
  //If the jar is closed (jarClosed is true), we draw the jar lid image on top of it.
  push()
  if (jarClosed) {
    imageMode(CENTER);
    image(plugImg, width/2, height - 530, 150, 80); 
  }
  pop()

 

  // camera
  image(flippedVideo, 0, 0, 160, 120);

// updates the Matter.js physics engine to make objects move real
  Engine.update(engine);

  // draw balls，I loop through all the falling items (balls) to draw 
  // them and check if they fall into the jar.
  for (let i = 0; i < balls.length; i++) {
    let b = balls[i];
    //Check if this ball has not been counted yet and whether it is 
    // currently within the jar opening area
    if (
      !b.counted &&
      b.body.position.x > jarX - (jarWidth - 350) / 2 &&
      b.body.position.x < jarX + (jarWidth - 350) / 2 &&
      b.body.position.y > jarY + jarHeight / 2 - 450 &&
      b.body.position.y < jarY + jarHeight / 2 - 430
    ) {
      //Increase the score counter for the ball’s type
      score[b.type]++;
      //If the scoring sound is loaded, play it.
      b.counted = true;
       if (scoreSound && scoreSound.isLoaded()) {
    scoreSound.play();
  }//Generate 20 particle effects at the position where the ball entered the jar.
      for (let j = 0; j < 20; j++) {
        particles.push(new Particle(b.body.position.x, b.body.position.y, particleImg));
      }
    }

    push();
    //Draw the ball’s image on the screen, following its physical position and rotation.
    // Let the position of the canvas follow the position of the ball.
    translate(b.body.position.x, b.body.position.y);
    rotate(b.body.angle);
    imageMode(CENTER);
    image(b.img, 0, 0, 60, 60);
    pop();
  }

  //draw the jar
  push();
  imageMode(CENTER);
  image(jarImg, width / 2, height - 270, 500, 500);
  pop();
  
  //Loop backward through all particles. We go backwards 
  // because we might remove items from the array.
  for (let i = particles.length - 1; i >= 0; i--) {
  particles[i].update();
  particles[i].show();
  if (particles[i].finished()) {
    particles.splice(i, 1);
  }
}

 
//show two interactive buttons and score text for the user to click.
push();
imageMode(CENTER);
image(finishButtonImg, width/2, 110, 100, 90);  
image(saveButtonImg, width/2, 180, 100, 90); 
pop();
  fill(50);
  textSize(20);
  textAlign(CENTER);
  fill(57,142,255)
  text('Finish',width/2, 120)
text('Save',width/2, 190)
  //text("Result: " + label, width / 2, height - 20);
text(`You Collect: 🐱 ${score.Kitty} 🐰 ${score.Bunny} 🐶 ${score.Puppy} 🐷 ${score.Piggy} 🦋 ${score.Butterfly}🦄 ${score.Unicorn}`, width / 2, 50);
  

}

// Teachable Machine classify
//Use the Teachable Machine classifier to classify the current frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

//Check if there is an error. If yes, log it to the console and stop.
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  //Get recognized tag + current time
  label = results[0].label;
  let currentTime = millis();
  //If the recognition result has changed and the time since the 
  // last drop has exceeded 4 seconds, allow the ball to drop to prevent continuous drops.
  if (label !== lastLabel && currentTime - lastDropTime > minInterval) {
   if (label === "Kitty") {
  dropBall(kittyImg, "Kitty");
} else if (label === "Bunny") {
  dropBall(bunnyImg, "Bunny");
} else if (label === "Butterfly") {
  dropBall(butterflyImg, "Butterfly");
} else if (label === "Puppy") {
  dropBall(puppyImg, "Puppy");
} else if (label === "Piggy") {
  dropBall(piggyImg, "Piggy");
} else if (label === "Unicorn") {
  dropBall(unicornImg, "Unicorn");
}
//Depending on the label to create a new ball with the matching image and type
//Update the time and label so we can compare again later.    
    lastDropTime = currentTime;
    lastLabel = label;
  }

  classifyVideo();
}

//create ball setup
function dropBall(img,type) {

  //Create a circular physics body using Matter.js:
  let b = Bodies.circle(random(0, width), 0, 30, {
    restitution: 0.6,
    friction: 0.01,
  });
  World.add(world, b);
  balls.push({ body: b, img: img, type: type, counted: false });
}

function closeJar() {
  jarClosed = true;
}
function saveJar() {
  let jarX = width / 2;
  let jarY = height - 270;
  let jarWidth = 500;
  let jarHeight = 500;
  
  // Take a screenshot of the jar area on the canvas and save it.
  let jarImage = get(jarX - jarWidth/2, jarY - jarHeight/2-30, jarWidth+100, jarHeight+30);
  save(jarImage, 'my_jar.png');
}

function mousePressed() {
  // if the mouse is inside the area of the Finish button, run closeJar()
  if (
    mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
    mouseY > 110 - 45 && mouseY < 110 + 45
  ) {
    closeJar(); 
  }

  // If the mouse is inside the Save button, take a screenshot.
  if (
    mouseX > width/2 - 50 && mouseX < width/2 + 50 &&
    mouseY > 180 - 45 && mouseY < 180 + 45
  ) {
    saveJar();
  }
}