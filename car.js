class Car {
    constructor(x, y, width, height, rayCount, controleType) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.acc = 2;
        this.friction = 0.5;

        this.rays = new Rays(x, y, rayCount);
        this.isCrashed = false;
        this.score = 0;
        this.timeSinceCheakpoint = 0;
        this.controlType = controleType;

        if (controleType == "AI") {
            this.network = new Network([rayCount, 6, 4]);
        }
        this.controls = new Controls();
        this.#rotate(-HALF_PI);
    }

    static addCars(amount, controleType) {
        cars = [];
        for (let i = 0; i < amount; i++) {
            cars.push(new Car(100, 250, 40, 75, 7, controleType));
        }
        return cars;
    }

    static findBestCar(cars) {
        return cars.find(
            (c) => c.score == Math.max(...cars.map((c) => c.score))
        );
    }

    update() {
        this.timeSinceCheakpoint++;
        if (
            this.isCrashed ||
            this.#isCrashing() ||
            (this.controlType == "AI" && this.timeSinceCheakpoint > 60)
        ) {
            this.isCrashed = true;
            this.score = 0;
            return;
        }
        if (this.#isToutchingCheakpoint()) {
            this.timeSinceCheakpoint = 0;
            this.score++;
        }
        if (!this.isCrashed) {
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
            this.#move();
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
        if (this.isCrashed) {
            fill(127, 10);
        }
        noStroke();
        rect(-0.5 * this.width, -0.5 * this.height, this.width, this.height);
        pop();
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

    #move() {
        if (this.controls.forward) {
            this.speed += this.acc;
        }
        if (this.controls.back) {
            this.speed -= this.acc;
        }
        if (this.controls.left) {
            this.#rotate(-0.02 * PI);
        }
        if (this.controls.right) {
            this.#rotate(0.02 * PI);
        }

        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        }

        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        if (abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        this.controls.reset();

        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
    }

    #rotate(rotation) {
        this.angle += rotation;
        this.rays.rotate(rotation);
    }

    #isCrashing() {
        for (let i = 0; i < walls.length; i++) {
            if (
                walls[i].to &&
                isPolyLineIntersecting(this.#toPoly(), walls[i])
            ) {
                return true;
            }
        }
        return false;
    }

    #isToutchingCheakpoint() {
        let nextCheakpoint = this.score % (cheakpoints.length - 1);
        if (isNaN(nextCheakpoint)) {
            nextCheakpoint = 0;
        }
        if (
            cheakpoints.length &&
            Object.keys(cheakpoints[nextCheakpoint]).length > 1 &&
            isPolyLineIntersecting(this.#toPoly(), cheakpoints[nextCheakpoint])
        ) {
            return true;
        }
        return false;
    }

    #toPoly() {
        let coords = [];
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
