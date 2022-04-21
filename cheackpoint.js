class Cheakpoints {
    constructor() {
        this.previous = null;
        this.isFirst = false;
        this.cheakpoints = [];
    }

    draw() {
        for (let i = 0; i < this.cheakpoints.length; i++) {
            this.cheakpoints[i].draw();
        }
        if (gameMode == "cheakpoint") {
            stroke(0, 0, 255); // Blue //
            ellipse(mouseX, mouseY, 5, 5);
            if ((this.previous && keyIsDown(16)) || !this.isFirst) {
                line(this.previous.x, this.previous.y, mouseX, mouseY);
            }
        }
    }

    addCoord(x, y) {
        let newCoord = createVector(x, y);
        if ((this.previous && keyIsDown(16)) || !this.isFirst) {
            this.cheakpoints.push(new Walls(this.previous, newCoord));
            this.isFirst = true;
        } else {
            this.isFirst = false;
        }
        this.previous = newCoord;
    }

    // getCoords() {
    //     let coords = [];
    //     for(let i = 0; i < this.walls.length; i++) {
    //         let coord = this.walls[i].getCoords();
    //         coords.push(coord);
    //     }
    //     return coords;
    // }
}

// class Cheakpoints {
//     constructor(from, to) {
//         this.from = from;
//         this.to = to;
//     }

//     draw() {
//         stroke(0);
//         line(this.from.x, this.from.y, this.to.x, this.to.y);
//     }
// }
