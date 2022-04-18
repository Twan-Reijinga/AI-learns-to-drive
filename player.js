class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.rays = createRays(x, y, 7);
        this.angle = 0;
    }

    draw(walls) {
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].drawIntersection(walls);
        }
        let c = 0.3;
        // push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(car, 0, 0, car.width*c, car.height*c);
        // pop();
        // image(car, this.x - car.width*(c/2), this.y - car.height*(c/2), car.width*c, car.height*c);
    }

    moveBy(direction) {
        let speed = PI;
        // this.x += dX;
        // this.y += dY;
        // this.direction = createVector(-cos(this.angle), -sin(this.angle));
        if(direction == "forward") { 
            this.x -= cos(this.angle + 1/2*PI) * speed;
            this.y -= sin(this.angle + 1/2*PI) * speed;
        } else if (direction == "back") {
            this.x += cos(this.angle + 1/2*PI) * speed;
            this.y += sin(this.angle + 1/2*PI) * speed;
        }
        console.log(cos(this.angle + 1/2 * PI))
        console.log(sin(this.angle + 1/2 * PI))

        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].changeLocation(this.x, this.y);
        }
    }

    rotate(rotation) {
        this.angle += rotation;
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].rotate(rotation);
        } 
    }
}

function createPlayers() {
    players = [];
    players.push(new Player(200, 200));
    // players.push(new Player(300, 200));
    // players.push(new Player(300, 300));
    // players.push(new Player(400, 400));
    return players;
}
