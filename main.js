let car;
let walls;
let cheakpoints;
let gameMode;

function setup() {
    const width = 800;
    const height = 600;

    createCanvas(width, height);
    frameRate(60);

    walls = new Walls("wall");
    cheakpoints = new Walls("cheakpoint");
    car = new Car(100, 200, 7);
    gameMode = "human";
    walls.addSideWalls(width, height);
}

function draw() {
    background(220);
    walls.draw(color(0));
    cheakpoints.draw(color(200, 100, 250));
    car.update();

    if (keyIsDown(49)) {
        gameMode = "human";
    }
    if (keyIsDown(50)) {
        gameMode = "selfDriving";
    }
    if (keyIsDown(51)) {
        gameMode = "wallBuild";
    }
    if (keyIsDown(52)) {
        gameMode = "cheakpointBuild";
    }
}

function importFromFile(txt) {
    let coords = JSON.parse(txt);
    walls.import(coords.walls);
    cheakpoints.import(coords.cheakpoints);
}

function exportToFile() {
    donwloadLink.download = prompt("save file as: ") + ".json";
    let wallCoords = walls.export();
    let cheakpointCoords = cheakpoints.export();
    let data = new Blob(
        [JSON.stringify({ walls: wallCoords, cheakpoints: cheakpointCoords })],
        {
            type: "text/plain"
        }
    );
    return window.URL.createObjectURL(data);
}

function mouseClicked() {
    if (gameMode == "wallBuild") {
        walls.addCoord(Math.round(mouseX), Math.round(mouseY));
    } else if (gameMode == "cheakpointBuild") {
        cheakpoints.addCoord(Math.round(mouseX), Math.round(mouseY));
    }
}

let donwloadLink = document.getElementById("download");
donwloadLink.addEventListener("click", function() {
    donwloadLink.href = exportToFile();
});

let uploadBox = document.getElementById("upload");
uploadBox.onchange = () => {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function() {
        importFromFile(reader.result);
    };
    reader.readAsText(input.files[0]);
};
