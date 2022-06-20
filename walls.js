class Walls {
    static enableDrawing() {
        if (!walls[walls.length - 1].to) {
            walls.pop();
        }
        setTimeout(() => {
            mode = "wallBuild";
        }, 1);
    }

    static sideWalls(w, h) {
        const xCoords = [-1, -1, w, w];
        const yCoords = [-1, h, h, -1];
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

    static draw(color) {
        stroke(color);
        for (let i = 0; i < walls.length; i++) {
            if (walls[i].to) {
                line(
                    walls[i].from.x,
                    walls[i].from.y,
                    walls[i].to.x,
                    walls[i].to.y
                );
            }
        }

        if (mode == "wallBuild") {
            strokeWeight(5);
            point(mouseX, mouseY);
            strokeWeight(1);

            if (!walls[walls.length - 1].to) {
                line(
                    mouseX,
                    mouseY,
                    walls[walls.length - 1].from.x,
                    walls[walls.length - 1].from.y
                );
            }

            if (keyIsDown(SHIFT) && walls[walls.length - 1].to) {
                line(
                    mouseX,
                    mouseY,
                    walls[walls.length - 1].to.x,
                    walls[walls.length - 1].to.y
                );
            }
        }
    }

    static build() {
        const newCoord = { x: Math.round(mouseX), y: Math.round(mouseY) };
        let lastCoord = walls[walls.length - 1].to;

        if (walls.length && lastCoord && keyIsDown(SHIFT)) {
            walls.push({ from: lastCoord, to: newCoord });
        } else if (!walls.length || lastCoord) {
            walls.push({ from: newCoord });
        } else {
            walls[walls.length - 1].to = newCoord;
        }
    }
}
