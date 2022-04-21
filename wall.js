class Walls {
    constructor() {
        this.previous = null;
        this.isFirst = true;
        this.walls = [];
        this.addSideWalls(800, 600);
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

    draw() {
        for (let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }
        if (gameMode == "build") {
            stroke(0);
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

    import(txt) {
        this.walls = [];
        let walls = JSON.parse(txt);
        for (let i = 0; i < walls.length; i++) {
            let from = createVector(walls[i].from.x, walls[i].from.y);
            let to = createVector(walls[i].to.x, walls[i].to.y);
            this.walls.push(new Wall(from, to));
        }
    }

    export() {
        donwloadLink.download = prompt("save file as: ") + ".json";
        let allCoords = [];
        for (let i = 0; i < this.walls.length; i++) {
            let coords = this.walls[i].getCoords();
            allCoords.push({
                from: { x: coords[0].x, y: coords[0].y },
                to: { x: coords[1].x, y: coords[1].y }
            });
        }
        let data = new Blob([JSON.stringify(allCoords)], {
            type: "text/plain"
        });
        return window.URL.createObjectURL(data);
    }
}

class Wall {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    draw() {
        stroke(0);
        line(this.from.x, this.from.y, this.to.x, this.to.y);
    }

    getCoords() {
        return [this.from, this.to];
    }
}
