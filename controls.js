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
            this.forward = true;
        }
        if (keyIsDown(LEFT_ARROW)) {
            this.left = true;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.back = true;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.right = true;
        }
    }
}
