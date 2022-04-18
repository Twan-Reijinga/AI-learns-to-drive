class Walls {
    constructor() {
        this.from = null;
        this.walls = [];
    }

    draw() {
        for(let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }
    }

    // get() {
    //     return this.walls;
    // }

    addCoord(x, y) {
        let newCoord = createVector(x, y);
        
        if(this.from) {
            this.walls.push(new Wall(this.from, newCoord));
            this.from = newCoord;
        } else {
            this.from = newCoord;
            console.log(this.from);
        }
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


