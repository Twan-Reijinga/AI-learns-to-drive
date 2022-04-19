class Walls {
    constructor() {
        this.previous = null;
        this.from = null;
        this.walls = [];
        this.addSideWalls(800, 600);
    }

    addSideWalls(w, h) {
        let xCoords = [-1, -1, w, w];
        let yCoords = [-1, h, h, -1];
        let coords = [];
        for(let i = 0; i < xCoords.length; i++) {
            let coord = createVector(xCoords[i], yCoords[i]);
            coords.push(coord);
        }
        for(let i = 0; i < coords.length; i++) {
            let next = i+1;
            if(next == coords.length) { next = 0; }
            let wall = new Wall(coords[i], coords[next]);
            this.walls.push(wall);
        }
    }


    draw() {
        for(let i = 0; i < this.walls.length; i++) {
            this.walls[i].draw();
        }
        if(gameMode == "build") {
            stroke(0);
            ellipse(mouseX, mouseY, 5, 5);
            if(this.previous && keyIsDown(16) || this.from) {
                line(this.previous.x, this.previous.y, mouseX, mouseY);
            } 
        }
    }

    addCoord(x, y) {
        let newCoord = createVector(x, y);
        
        if(this.previous && keyIsDown(16)) {
            this.walls.push(new Wall(this.previous, newCoord));
            // this.from = newCoord;
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

    exportToFile() {
        donwloadLink.download = prompt("save file as: ") + ".json";
        let allCoords = [];
        for(let i = 0; i < this.walls.length; i++) {
            let coords = this.walls[i].getCoords();
            allCoords.push(coords[0].x, coords[0].y, coords[0].x, coords[0].y);
        }
        let data = new Blob([JSON.stringify(allCoords)], {type: 'text/plain'});
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


