class Particle {
    constructor(x, y, img) {
      this.pos = createVector(x, y);
      //set a random direction and speed for the particle. 
      // It moves in 2D space at a speed between 3 and 6. Set the starting opacity
      this.vel = p5.Vector.random2D().mult(random(3, 6)); 
      this.alpha = 255;
      this.r = 15; 
      this.img = img;
    }
  
    update() {
      this.pos.add(this.vel);
      this.alpha -= 10; //  Reduce opacity
    }
  
    finished() {
      //If opacity is less than 0, it can be deleted from the array.
      return this.alpha < 0;
    }
  
    show() {
      push();
      imageMode(CENTER);
      tint(255, this.alpha);
      image(this.img, this.pos.x, this.pos.y, this.r, this.r); 
      pop();
    }
  }
  