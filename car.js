class Cars {
    constructor(x, y, amount, rayCount) {
        this.cars = [];
        this.addCars(x, y, amount, rayCount);
    }

    addCars(x, y, amount, rayCount) {
        for (let i = 0; i < amount; i++) {
            this.cars.push(new Car(x, y, (-1 / 2) * PI, rayCount));
        }
    }

    update() {
        for (let i = 0; i < this.cars.length; i++) {
            this.cars[i].update();
        }
    }

    rotateAll(rotation) {
        for (let i = 0; i < this.cars.length; i++) {
            this.rotate(i, rotation);
        }
    }

    rotate(carNum, rotation) {
        this.cars[carNum].rotate(rotation);
    }

    moveAll(direction) {
        for (let i = 0; i < this.cars.length; i++) {
            this.move(i, direction);
        }
    }

    move(carNum, direction) {
        this.cars[carNum].move(direction);
    }
}

class Car {
    constructor(x, y, angle, rayCount) {
        this.x = x;
        this.y = y;
        this.v = createVector(0, 0); // !  cheak?

        this.angle = 0;
        this.width = 100;
        this.height = 120;
        this.speed = 0.2;
        this.resistance = 1.04;

        this.img = loadImage("assets/car2.0.png");
        this.rays = new Rays(x, y, rayCount);
        this.rotate(angle);
        this.isCrashed = false;
        this.score = 0;
    }

    update() {
        if (
            cheakpoints.walls.length &&
            this.score == cheakpoints.walls.length
        ) {
            return;
        }
        if (this.isCrashed || this.isCrashing()) {
            this.isCrashed = true;
        }
        if (this.isToutchingCheakpoint()) {
            this.score++;
        }
        if (!this.isCrashed) {
            this.x += this.v.x;
            this.y += this.v.y;
            this.v.x /= this.resistance;
            this.v.y /= this.resistance;

            this.rays.changeLocation(this.x, this.y);
            this.draw();
        }
    }

    draw() {
        this.rays.drawWallIntersections();
        push();
        translate(this.x, this.y);
        rotate(this.angle + HALF_PI);
        imageMode(CENTER);
        image(this.img, 0, 0, this.width, this.height);
        pop();
    }

    rotate(rotation) {
        this.angle += rotation;
        this.rays.rotate(rotation);
    }

    move(direction) {
        let vX = cos(this.angle) * this.speed * direction;
        let vY = sin(this.angle) * this.speed * direction;
        this.v.add(vX, vY);
    }

    getDistances(objects) {
        return this.rays.getDistances(objects);
    }

    isCrashing() {
        const crashDistance = 15;
        let distance = this.rays.getShortestDistance(walls);
        if (distance < crashDistance) {
            return true;
        }
        return false;
    }

    isToutchingCheakpoint() {
        if (!cheakpoints.walls.length) return;
        const toutchDistance = 15;
        let currentCheakpoint = cheakpoints.walls[this.score];
        let distance = this.rays.getDistanceToObject(currentCheakpoint);
        if (distance < toutchDistance) {
            return true;
        }
        return false;
    }
}
