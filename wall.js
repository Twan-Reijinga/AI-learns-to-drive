class Walls {
    constructor(type) {
        this.type = type;
        this.walls = [];
        this.previous = null;
        this.isFirst = true;
    }

    addSideWalls(w, h) {
        let xCoords = [-1, -1, w, w];
        let yCoords = [-1, h, h, -1];
        let coords = [];
        for (let i = 0; i < xCoords.length; i++) {
            let coord = createVector(xCoords[i], yCoords[i]);
            coords.push(coord);
        }
        for (let i = 0; i < coords.length; i++) {
            let next = i + 1;
            if (next == coords.length) {
                next = 0;
            }
            let wall = new Wall(coords[i], coords[next]);
            this.walls.push(wall);
        }
    }

    draw(color) {
        stroke(color);
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }
        if (gameMode == this.type + "Build") {
            ellipse(mouseX, mouseY, 5, 5);
            if ((this.previous && keyIsDown(16)) || !this.isFirst) {
                line(this.previous.x, this.previous.y, mouseX, mouseY);
            }
        }
    }

    addCoord(x, y) {
        let newCoord = createVector(x, y);
        if ((this.previous && keyIsDown(16)) || !this.isFirst) {
            this.walls.push(new Wall(this.previous, newCoord));
            this.isFirst = true;
        } else {
            this.isFirst = false;
        }
        this.previous = newCoord;
    }

    getCoords() {
        let coords = [];
        for (let i = 0; i < this.walls.length; i++) {
            let coord = this.walls[i].getCoords();
            coords.push(coord);
        }
        return coords;
    }

    import(coords) {
        for (let i = 0; i < coords.length; i++) {
            let from = createVector(coords[i].from.x, coords[i].from.y);
            let to = createVector(coords[i].to.x, coords[i].to.y);
            this.walls.push(new Wall(from, to));
        }
    }

    export() {
        let allCoords = [];
        for (let i = 0; i < this.walls.length; i++) {
            let coords = this.walls[i].getCoords();
            allCoords.push({
                from: { x: coords[0].x, y: coords[0].y },
                to: { x: coords[1].x, y: coords[1].y }
            });
        }
        return allCoords;
    }
}

class Wall {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    draw() {
        line(this.from.x, this.from.y, this.to.x, this.to.y);
    }

    getCoords() {
        return [this.from, this.to];
    }
}
