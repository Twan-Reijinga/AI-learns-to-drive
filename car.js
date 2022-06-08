function createCars(amount) {
    cars = [];
    for (let i = 0; i < amount; i++) {
        cars.push(new Car(100, 250, 40, 75, 7, 0.8, "Human"));
    }
    return cars;
}

function findBestCar() {
    const bestCar = cars.find(
        (c) => c.score == Math.max(...cars.map((c) => c.score))
    );
    return bestCar;
}

class Car {
    constructor(
        x,
        y,
        width,
        height,
        rayCount,
        speed = 0.8,
        controleType = "AI"
    ) {
        this.x = x;
        this.y = y;
        this.v = createVector(0, 0);

        this.angle = 0;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.resistance = 1.04;

        this.rays = new Rays(x, y, rayCount);
        this.isCrashed = false;
        this.cheakpointsReached = 0;
        this.score = 0;
        this.timeSinceLastCheak = 0;
        this.controlType = controleType;

        if (controleType == "AI") {
            this.network = new Network([rayCount, 6, 4]);
        }
        this.controls = new Controls();
        this.#rotate(-HALF_PI);
    }

    update() {
        this.timeSinceLastCheak++;
        this.#moveByControls();
        if (
            cheakpoints.length &&
            this.cheakpointsReached == cheakpoints.length
        ) {
            // car won!
            alert("Car reached finish!");
            return;
        }
        if (this.isCrashed || this.isCrashing()) {
            this.isCrashed = true;
            return;
        }
        if (this.isToutchingCheakpoint()) {
            this.cheakpointsReached++;
            this.score += 1 + 1 / this.timeSinceLastCheak;
            this.timeSinceLastCheak = 0;
        }
        if (!this.isCrashed) {
            this.x += this.v.x;
            this.y += this.v.y;
            this.v.x /= this.resistance;
            this.v.y /= this.resistance;

            this.rays.changeLocation(this.x, this.y);
            switch (this.controlType) {
                case "AI":
                    const distances = this.rays.getDistances(walls);
                    this.#prossesNetworkControls(distances);
                    break;
                case "Human":
                    this.controls.prossesHumanControls();
                    break;
            }
        }
    }

    #prossesNetworkControls(distances) {
        const outputs = Network.getOutputs(this.network, distances);
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

    #moveByControls() {
        if (this.controls.forward) {
            this.#move(1);
        }
        if (this.controls.back) {
            this.#move(-1);
        }
        if (this.controls.left) {
            this.#rotate(-0.01 * PI);
        }
        if (this.controls.right) {
            this.#rotate(0.01 * PI);
        }
        this.controls.reset();
    }

    #rotate(rotation) {
        this.angle += rotation;
        this.rays.rotate(rotation);
    }

    #move(direction) {
        let vX = cos(this.angle) * this.speed * direction;
        let vY = sin(this.angle) * this.speed * direction;
        this.v.add(vX, vY);
    }

    draw(color, isRayVisible) {
        if (isRayVisible) {
            this.rays.drawWallIntersections();
        }
        push();
        translate(this.x, this.y);
        rotate(this.angle + HALF_PI);
        fill(color);
        if (this.isCrashed) {
            fill(127, 40);
        }
        noStroke();
        rect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
        pop();
    }

    isCrashing() {
        for (let i = 0; i < walls.length; i++) {
            if (isPolyLineIntersecting(this.toPoly(), walls[i])) {
                return true;
            }
        }
        return false;
    }

    isToutchingCheakpoint() {
        for (let i = 0; i < cheakpoints.length; i++) {
            if (isPolyLineIntersecting(this.toPoly(), cheakpoints[i])) {
                return true;
            }
        }
        return false;
    }

    toPoly() {
        const coords = [];
        const rad = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        coords.push({
            x: this.x - Math.cos(this.angle - alpha) * rad,
            y: this.y - Math.sin(this.angle - alpha) * rad,
        });
        coords.push({
            x: this.x - Math.cos(this.angle + alpha) * rad,
            y: this.y - Math.sin(this.angle + alpha) * rad,
        });
        coords.push({
            x: this.x - Math.cos(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.sin(Math.PI + this.angle - alpha) * rad,
        });
        coords.push({
            x: this.x - Math.cos(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.sin(Math.PI + this.angle + alpha) * rad,
        });
        return coords;
    }
}
