class Cheakpoints {
    constructor() {
        this.previous = null;
        this.isFirst = true;
        this.cheakpoints = [];
    }

    draw() {
        stroke(200, 100, 250);
        for (let i = 0; i < this.cheakpoints.length; i++) {
            this.cheakpoints[i].draw();
        }
        if (gameMode == "cheakpoint") {
            ellipse(mouseX, mouseY, 5, 5);
            if ((this.previous && keyIsDown(16)) || !this.isFirst) {
                line(this.previous.x, this.previous.y, mouseX, mouseY);
            }
        }
    }

    addCoord(x, y) {
        let newCoord = createVector(x, y);
        if ((this.previous && keyIsDown(16)) || !this.isFirst) {
            this.cheakpoints.push(new Wall(this.previous, newCoord));
            console.log(this.cheakpoints);

            this.isFirst = true;
        } else {
            this.isFirst = false;
        }
        this.previous = newCoord;
    }

    getCoords() {
        let coords = [];
        for (let i = 0; i < this.cheakpoints.length; i++) {
            let coord = this.cheakpoints[i].getCoords();
            coords.push(coord);
        }
        return coords;
    }
}

// class Cheakpoint {
//     constructor(from, to) {
//         this.from = from;
//         this.to = to;
//     }

//     draw() {
//         stroke(0);
//         line(this.from.x, this.from.y, this.to.x, this.to.y);
//     }
// }
