class Ray {
    constructor(x, y, angle) {
        this.angle = 0;
        this.rotate(angle);
        this.changeLocation(x, y);
    }

    static addRays(x, y, amount) {
        let rays = [];
        for (
            let angle = HALF_PI;
            angle <= HALF_PI + PI;
            angle += PI / (amount - 1)
        ) {
            rays.push(new Ray(x, y, angle));
        }
        return rays;
    }

    rotate(rotation) {
        this.angle += rotation;
        this.direction = createVector(-cos(this.angle), -sin(this.angle));
    }

    changeLocation(x, y) {
        this.x = x;
        this.y = y;
    }

    getIntersection(object) {
        const loc = createVector(this.x, this.y);
        const direction = createVector(
            this.direction.x + this.x,
            this.direction.y + this.y
        );
        if (!object.to) {
            return false;
        }
        return isLineLineIntersecting(
            loc,
            direction,
            object.from,
            object.to,
            1
        );
    }

    getDistance(objects) {
        let shortestDistance = Infinity;
        for (let i = 0; i < objects.length; i++) {
            let intersection = this.getIntersection(objects[i]);
            let newDistance = Infinity;
            if (intersection) {
                const dX = this.x - intersection.x;
                const dY = this.y - intersection.y;
                newDistance = sqrt(pow(dX, 2) + pow(dY, 2));
            }
            if (newDistance < shortestDistance) {
                shortestDistance = newDistance;
            }
        }
        return shortestDistance;
    }

    drawIntersection(walls) {
        let distance = this.getDistance(walls);
        stroke(0, 255, 0);
        let intersectionX = this.direction.x * distance + this.x;
        let intersectionY = this.direction.y * distance + this.y;
        line(this.x, this.y, intersectionX, intersectionY);
    }
}
