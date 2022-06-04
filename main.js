let cars = [];
let walls;
let cheakpoints;
let gameMode;

function setup() {
    const width = 800;
    const height = 600;

    createCanvas(width, height);
    frameRate(24);

    walls = new Walls("wall");
    cheakpoints = new Walls("cheakpoint");
    gameMode = "human";
    cars = createCars(1);

    walls.addSideWalls(width, height);

    if (localStorage.getItem("map")) {
        importMap(localStorage.getItem("map"));
    }

    if (localStorage.getItem("network")) {
        cars[0].network = JSON.parse(localStorage.getItem("network"));
        for (let i = 1; i < cars.length; i++) {
            cars[i].network = JSON.parse(localStorage.getItem("network"));
            if (i != 1) {
                Network.mutate(cars[i].network, 0.2);
            }
        }
    }
}

function draw() {
    background(220);
    walls.draw(color(0));
    cheakpoints.draw(color(200, 100, 250));
    let carsAlive = false;
    for (let i = 0; i < cars.length; i++) {
        if (!cars[i].isCrashed) {
            i = cars.length;
            carsAlive = true;
        }
    }
    if (!carsAlive) {
        for (let i = 1; i < cars.length; i++) {
            cars[i].network = JSON.parse(findBestCar.network);
            if (i != 1) {
                Network.mutate(cars[i].network, 0.2);
            }
        }
    }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update();
        cars[i].draw(color(255, 0, 0, 50), 0);
    }

    const bestCar = findBestCar();
    bestCar.draw(color(0, 0, 255), 1);

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

function importMap(txt) {
    const coords = JSON.parse(txt);
    walls.import(coords.walls);
    cheakpoints.import(coords.cheakpoints);
}

function exportMapToFile() {
    donwloadLink.download = prompt("save file as: ") + ".json";
    const wallCoords = walls.export();
    const cheakpointCoords = cheakpoints.export();
    const data = new Blob(
        [JSON.stringify({ walls: wallCoords, cheakpoints: cheakpointCoords })],
        {
            type: "text/plain",
        }
    );
    return window.URL.createObjectURL(data);
}

function saveMap() {
    const wallCoords = walls.export();
    const cheakpointCoords = cheakpoints.export();
    localStorage.setItem(
        "map",
        JSON.stringify({ walls: wallCoords, cheakpoints: cheakpointCoords })
    );
}

function removeMap() {
    localStorage.removeItem("map");
}

function saveBestNetwork() {
    const wallCoords = walls.export();
    const cheakpointCoords = cheakpoints.export();
    localStorage.setItem("network", JSON.stringify(findBestCar().network));
}

function removeBestNetwork() {
    localStorage.removeItem("network");
}

function mouseClicked() {
    if (gameMode == "wallBuild") {
        walls.addCoord(Math.round(mouseX), Math.round(mouseY));
    } else if (gameMode == "cheakpointBuild") {
        cheakpoints.addCoord(Math.round(mouseX), Math.round(mouseY));
    }
}

const donwloadLink = document.getElementById("download");
donwloadLink.addEventListener("click", function () {
    donwloadLink.href = exportMapToFile();
});

const uploadBox = document.getElementById("upload");
uploadBox.onchange = () => {
    let input = event.target;
    let reader = new FileReader();
    reader.onload = function () {
        importMap(reader.result);
    };
    reader.readAsText(input.files[0]);
};
