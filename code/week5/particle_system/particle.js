class Particle {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0)
        this.r = r;
        this.fricition = 0.995;
        this.maxAge = random(100,300)
        this.age = 0

    }


    update() {
        this.age++
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0);
        //this.bounce()
        this.vel.mult(this.fricition)

    }

    isDead() {
        return this.age > this.maxAge;
    }



    applyForce(force) {
        this.acc.add(force);
    }

    setActive(active) {
        this.isActive = active

    }



    bounce() {
        if (this.pos.y > height) {
            this.pos.y = height;
            this.vel.y *= -1
        } else if (this.pos.y < 0) {
            this.pos.y = 0
            this.vel.y *= -1
        }

        if (this.pos.x > width) {
            this.pos.x = width;
            this.vel.x *= -1
        } else if (this.pos.x < 0) {
            this.pos.x = 0
            this.vel.x *= -1
        }


    }

    display() {
        noStroke()
        const alpha = map(this.age,0,this.maxAge, 255,0)
        fill(255,alpha)
        circle(this.pos.x, this.pos.y, this.r * 2)

    }
}