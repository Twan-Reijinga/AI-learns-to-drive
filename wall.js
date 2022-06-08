function sideWalls(w, h) {
    let xCoords = [-1, -1, w, w];
    let yCoords = [-1, h, h, -1];
    let coords = [];
    let walls = [];

    for (let i = 0; i < xCoords.length; i++) {
        let coord = { x: xCoords[i], y: yCoords[i] };
        coords.push(coord);
    }
    for (let i = 0; i < coords.length; i++) {
        let wall = { from: coords[i], to: coords[(i + 1) % coords.length] };
        walls.push(wall);
    }
    return walls;
}

class WallsMaker {
    constructor() {
        this.previous = null;
        this.isFirst = true;
    }

    drawActiveLine(type) {
        if (mode == type + "Build") {
            ellipse(mouseX, mouseY, 5, 5);
            if ((this.previous && keyIsDown(16)) || !this.isFirst) {
                line(this.previous.x, this.previous.y, mouseX, mouseY);
            }
        }
    }

    addCoord(x, y, walls) {
        let newCoord = { x: x, y: y };
        if ((this.previous && keyIsDown(16)) || !this.isFirst) {
            this.isFirst = true;
            walls.push({ from: this.previous, to: newCoord });
        } else {
            this.isFirst = false;
        }
        this.previous = newCoord;
        return walls;
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
                to: { x: coords[1].x, y: coords[1].y },
            });
        }
        return allCoords;
    }
}

// class Wall {
//     constructor(from, to) {
//         this.from = from;
//         this.to = to;
//     }

//     draw() {
//         line(this.from.x, this.from.y, this.to.x, this.to.y);
//     }

//     getCoords() {
//         return [this.from, this.to];
//     }
// }
