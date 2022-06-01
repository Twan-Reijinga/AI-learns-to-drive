function createCars(amount) {
    cars = [];
    for (let i = 0; i < amount; i++) {
        cars.push(new Car(100, 200, 7));
    }
    return cars;
}

function findBestCar() {
    const bestCar = cars.find(
        c => c.score == Math.max(...cars.map(c => c.score))
    );
    return bestCar;
}

class Car {
    constructor(x, y, rayCount) {
        this.x = x;
        this.y = y;
        this.v = createVector(0, 0);

        this.angle = 0;
        this.width = 50;
        this.height = 90;
        this.speed = 0.2;
        this.resistance = 1.04;

        this.img = loadImage("assets/car2.0.png");
        this.rays = new Rays(x, y, rayCount);
        this.isCrashed = false;
        this.score = 0;

        this.network = new Network([rayCount, 6, 4]);
        this.controls = new Controls();

        this.rotate(-HALF_PI);
    }

    update() {
        this.moveByControls();
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
            switch (gameMode) {
                case "selfDriving":
                    const distances = this.rays.getDistances(walls);
                    this.prossesNetworkControls(distances);
                    break;
                case "human":
                    this.controls.prossesHumanControls();
                    break;
            }
        }
    }

    prossesNetworkControls(distances) {
        const outputs = this.network.getOutputs(distances);
        this.controls.reset();
        if (outputs[0]) {
            this.controls.forward = true;
        }
        if (outputs[1]) {
            this.controls.back = true;
        }
        if (outputs[2]) {
            this.controls.left = true;
        }
        if (outputs[3]) {
            this.controls.right = true;
        }
    }

    draw(color, isRayVisible) {
        if (isRayVisible) {
            this.rays.drawWallIntersections();
        }
        push();
        translate(this.x, this.y);
        rotate(this.angle + HALF_PI);
        fill(color);
        noStroke();
        rect(-0.5 * this.width, -0.4 * this.height, this.width, this.height);
        pop();
    }

    moveByControls() {
        if (this.controls.forward) {
            this.move(1);
        }
        if (this.controls.back) {
            this.move(-1);
        }
        if (this.controls.left) {
            this.rotate(-0.01 * PI);
        }
        if (this.controls.right) {
            this.rotate(0.01 * PI);
        }
        this.controls.reset();
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
