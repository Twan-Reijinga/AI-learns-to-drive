function drawWalls() {
    setTimeout(() => {
        mode = "wallBuild";
    }, 1);
}

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
}
