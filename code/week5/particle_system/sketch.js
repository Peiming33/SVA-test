let particleSystem
let img

function preload() {
  img = loadImage("asset/portrait.png")
}

function setup() {
  createCanvas(600,766);
  particleSystem = new ParticleSystem(img);

}

function draw(){
    background(0)
    particleSystem.loop()
    if(mouseIsPressed){
      particleSystem.addParticles(mouseX, mouseY,2);
    }

    //image(img,0,0)

}


function mouseIsPressed(){}

