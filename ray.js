class Rays {
    constructor(x, y, amount) {
        this.rays = [];
        this.addRays(x, y, amount);
    }

    rotate(rotation) {
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].rotate(rotation);
        }
    }

    changeLocation(x, y) {
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].changeLocation(x, y);
        }
    }

    addRays(x, y, amount) {
        for (
            let angle = HALF_PI;
            angle <= HALF_PI + PI;
            angle += PI / (amount - 1)
        ) {
            this.rays.push(new Ray(x, y, angle));
        }
    }

    getDistances(objects) {
        let distances = [];
        for (let i = 0; i < this.rays.length; i++) {
            let newDistance = this.rays[i].getDistance(objects);
            distances.push(newDistance);
        }
        return distances;
    }

    getShortestDistance(objects) {
        let distances = this.getDistances(objects);
        return Math.min(...distances);
    }

    drawWallIntersections() {
        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].drawIntersection(walls);
        }
    }
}

class Ray {
    constructor(x, y, angle) {
        this.angle = 0;
        this.rotate(angle);
        this.changeLocation(x, y);
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
        return isLineLineIntersecting(
            loc,
            direction,
            object.from,
            object.to,
            1
        );
    }

    // getDistanceToObject(object) {
    //     let intersection = this.getIntersection(object);
    //     if (intersection) {
    //         const dX = this.x - intersection.x;
    //         const dY = this.y - intersection.y;
    //         let newDistance = sqrt(pow(dX, 2) + pow(dY, 2));
    //         return newDistance;
    //     }
    //     return Infinity;
    // }

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
