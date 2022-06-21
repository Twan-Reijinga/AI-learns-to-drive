class Cheakpoints {
    static enableDrawing() {
        if (cheakpoints.length && !cheakpoints[cheakpoints.length - 1].to) {
            cheakpoints.pop();
        }
        mode = "cheakpointBuild";
    }

    static draw(color) {
        stroke(color);
        for (let i = 0; i < cheakpoints.length; i++) {
            if (cheakpoints[i].to) {
                line(
                    cheakpoints[i].from.x,
                    cheakpoints[i].from.y,
                    cheakpoints[i].to.x,
                    cheakpoints[i].to.y
                );
            }
        }
        if (mode == "cheakpointBuild") {
            strokeWeight(5);
            point(mouseX, mouseY);
            strokeWeight(1);

            if (cheakpoints.length && !cheakpoints[cheakpoints.length - 1].to) {
                line(
                    mouseX,
                    mouseY,
                    cheakpoints[cheakpoints.length - 1].from.x,
                    cheakpoints[cheakpoints.length - 1].from.y
                );
            }

            if (
                keyIsDown(SHIFT) &&
                cheakpoints.length &&
                cheakpoints[cheakpoints.length - 1].to
            ) {
                line(
                    mouseX,
                    mouseY,
                    cheakpoints[cheakpoints.length - 1].to.x,
                    cheakpoints[cheakpoints.length - 1].to.y
                );
            }
        }
    }

    static build() {
        if (mouseX < 0 || mouseY < 0) return;
        const newCoord = { x: Math.round(mouseX), y: Math.round(mouseY) };
        if (cheakpoints.length) {
            var lastCoord = cheakpoints[cheakpoints.length - 1].to;
        }

        if (cheakpoints.length && lastCoord && keyIsDown(SHIFT)) {
            cheakpoints.push({ from: lastCoord, to: newCoord });
        } else if (!cheakpoints.length || lastCoord) {
            cheakpoints.push({ from: newCoord });
        } else {
            cheakpoints[cheakpoints.length - 1].to = newCoord;
        }
    }
}
