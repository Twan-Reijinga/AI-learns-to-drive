class Car {
    constructor(
        x,
        y,
        width,
        height,
        rayCount = 7,
        maxSpeed = 5,
        controleType = "AI"
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.angle = 0;
        this.speed = 0;
        this.maxSpeed = maxSpeed;
        this.acceleration = 0.1;
        this.resistance = 0.05;

        this.rays = new Rays(x, y, rayCount);
        this.isCrashed = false;
        this.nextCheakpoint = 0;
        this.timeSinceCheakpoint = 0;
        this.score = 0;
        this.controlType = controleType;

        if (controleType == "AI") {
            this.network = new Network([rayCount, 6, 4]);
        }
        this.controls = new Controls();

        this.rotate(-HALF_PI);
    }

    update() {
        this.timeSinceCheakpoint++;

        if (this.isCrashed || this.#isCrashing()) {
            return;
        }
    }

    draw(color, isRayVisible) {}

    #isCrashing() {}
}
