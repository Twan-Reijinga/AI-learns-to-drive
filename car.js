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
        this.friction = 1;

        this.rays = Ray.addRays(x, y, rayCount);
        this.isCrashed = false;
        this.currentCheakpoint = 0;
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
        if (
            this.isCrashed ||
            this.#isCrashing() ||
            (this.controlType == "AI" && this.timeSinceCheakpoint > 30)
        ) {
            this.isCrashed = true;
            return;
        }
        if (this.#isToutchingCheakpoint()) {
            this.currentCheakpoint++;
            this.score += 1 + 1 / this.timeSinceCheakpoint;
            this.timeSinceCheakpoint = 0;
        }
        if (!this.isCrashed) {
            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].changeLocation(this.x, this.y);
            }
            switch (this.controlType) {
                case "AI":
                    let distances = [];
                    for (let i = 0; i < this.rays.length; i++) {
                        let newDistance = this.rays[i].getDistance(walls);
                        distances.push(newDistance);
                    }
                    this.#prossesNetworkControls(distances);
                    break;
                case "Human":
                    this.controls.prossesHumanControls();
                    break;
            }
            this.#move();
        }
        if (this.currentCheakpoint >= cheakpoints.length - 1) {
            this.currentCheakpoint = 0;
        }
        this.timeSinceCheakpoint++;
    }

    draw(color, isRayVisible) {
        if (isRayVisible) {
            for (let i = 0; i < this.rays.length; i++) {
                this.rays[i].drawIntersection(walls);
            }
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
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].rotate(rotation);
        }
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
        if (
            cheakpoints.length &&
            Object.keys(cheakpoints[this.currentCheakpoint]).length > 1 &&
            isPolyLineIntersecting(
                this.#toPoly(),
                cheakpoints[this.currentCheakpoint]
            )
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
