class Vehicle{
    constructor(x,y){
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector()
    this.fricition = 0.998

    }

    applyForce(force){
        this.acc.add(force);
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0);
        this.vel.mult(this.fricition)

    }

    bounce() {
        if(this.pos.y>height){
            this.pos.y = height
            this.vel.y *= -1;
        }
        if (this.pos.x > width || this.pos.x < 0){
            this.vel.x *= -1
        }
    }

    display() {
        circle(this.pos.x, this.pos.y,50)

    }
}