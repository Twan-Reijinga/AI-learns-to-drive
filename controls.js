class Controls {
    constructor() {
        this.forward = false;
        this.back = false;
        this.left = false;
        this.right = false;
    }
    reset() {
        this.forward = false;
        this.back = false;
        this.left = false;
        this.right = false;
    }
    prossesHumanControls() {
        if (keyIsDown(UP_ARROW)) {
            car.move(1);
        }
        if (keyIsDown(LEFT_ARROW)) {
            car.rotate(-0.01 * PI);
        }
        if (keyIsDown(DOWN_ARROW)) {
            car.move(-1);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            car.rotate(0.01 * PI);
        }
    }
}
