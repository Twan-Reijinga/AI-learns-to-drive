class Cheakpoints {
    static enableDrawing() {
        setTimeout(() => {
            mode = "cheakpointBuild";
        }, 1);
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
}
