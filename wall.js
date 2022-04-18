class Walls {
    constructor() {
        this.previous = null;
        this.from = null;
        this.walls = [];
    }

    draw() {
        for(let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }
        if(gameMode == "draw") {
            stroke(0);
            ellipse(mouseX, mouseY, 5, 5);
            if(this.previous && keyIsDown(16)) {
                line(this.previous.x, this.previous.y, mouseX, mouseY);
            } else if(this.from) {
                line(this.from.x, this.from.y, mouseX, mouseY);
            }
            
        }
    }

    addCoord(x, y) {
        let newCoord = createVector(x, y);
        
        if(this.previous && keyIsDown(16)) {
            this.walls.push(new Wall(this.previous, newCoord));
            this.from = newCoord;
        } else if(this.from) {
            this.walls.push(new Wall(this.previous, newCoord));
            this.from = null;
        } else {
            this.from = newCoord;
        }
        this.previous = newCoord;
    }

    getCoords() {
        let coords = [];
        for(let i = 0; i < this.walls.length; i++) {
            let coord = this.walls[i].getCoords();
            coords.push(coord);
        }
        return coords;
    }

    importFromFile(filename) {
        // ! WIP
    }

    exportToFile(filename) {
        // ! WIP
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

// function createWalls() {
//     let walls = [];
//     let coords =   [[100, 100, 600, 100], 
//                     [600, 100, 600, 500], 
//                     [600, 500, 100, 500], 
//                     [100, 500, 100, 100]];
    
//     for(let i = 0; i < coords.length; i++) {
//         let from = createVector(coords[i][0], coords[i][1]);
//         let to   = createVector(coords[i][2], coords[i][3]);
//         walls.push(new Wall(from, to));
//     }
//     return walls;

// }


