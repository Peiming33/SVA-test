let btn


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER)
  btn = select('#my-button')
  btn.mouseClicked(onBtnClicked)

}

function onBtnClicked(){
  fill(random(225));
}
function draw() {

  if (mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY)
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}