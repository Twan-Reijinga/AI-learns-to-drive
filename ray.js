class Rays {
    constructor(x, y, amount) {
        this.rays = [];
        this.addRays(x, y, amount);
    }

    rotate(rotation) {
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].rotate(rotation);
        }
    }

    changeLocation(x, y) {
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].changeLocation(x, y);
        }
    }

    addRays(x, y, amount) {
        for(let angle = 1/2 * PI; angle <= 3/2 * PI; angle += PI/(amount-1)) {
            this.rays.push(new Ray(x, y, angle));
        }
    }

    getDistances() {
        let distances = [];
        for(let i = 0; i < this.rays.length; i++) {
            let newDistance = this.rays[i].getDistance();
            distances.push(newDistance);
        }
        return distances;
    }

    getShortestDistance() {
        let distances = this.getDistances();
        return Math.min(...distances);
    }

    drawIntersections() {
        for(let i = 0; i < this.rays.length; i++) {
            this.rays[i].drawIntersection();
        }
    }
}

class Ray {
    constructor(x, y, angle) {
        this.changeLocation(x, y);
        this.angle = 0;
        this.rotate(angle);
    }

    rotate(rotation) {
        this.angle += rotation;
        this.direction = createVector(-cos(this.angle), -sin(this.angle));
    }

    changeLocation(x, y) {
        this.x = x;
        this.y = y;
    }

    getIntersection(wall) {
        const dXWall = wall[0].x - wall[1].x;
        const dYWall = wall[0].y - wall[1].y;
        const dXRay = -this.direction.x;       
        const dYRay = -this.direction.y;       
        
        const d = dXWall * dYRay - dYWall * dXRay;
        if(d == 0) {
            return false;
        }
        const t = ((wall[0].x - this.x) * dYRay  - (wall[0].y - this.y) * dXRay ) / d;
        const u = ((wall[0].x - this.x) * dYWall - (wall[0].y - this.y) * dXWall) / d;

        if (t > 0 && t < 1 && u > 0) {
            this.intersection = createVector();
            this.intersection.x = wall[0].x + t * -dXWall;
            this.intersection.y = wall[0].y + t * -dYWall;
            return this.intersection;
        }
        return false;
    }

    getDistance() {
        let shortestDistance = Infinity;
        let wallCoords = walls.getCoords();
        for(let i = 0; i < wallCoords.length; i++) {
            let intersection = this.getIntersection(wallCoords[i]);
            if(intersection) {
                const dX = this.x - intersection.x;
                const dY = this.y - intersection.y; 
                let newDistance = sqrt(pow(dX, 2) + pow(dY, 2));
                if(newDistance < shortestDistance) {
                    shortestDistance = newDistance;
                }
            }
        }
        return shortestDistance;
    }

    drawIntersection() {
        let distance = this.getDistance();
        stroke(0, 255, 0);
        let intersectionX = this.direction.x * distance;
        let intersectionY = this.direction.y * distance;
        push();
        translate(this.x, this.y);
        line(0, 0, intersectionX, intersectionY);
        pop();
    }
}

function createRays(x, y, q) { 
    rays = [];
    for(let angle = 1/2 * PI; angle <= 3/2 * PI; angle += PI/(q-1)) {
        rays.push(new Ray(x, y, angle));
    }
    return rays;
}