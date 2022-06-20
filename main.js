let cars = [];
let walls = [];
let cheakpoints = [];
// let wallMaker;
let mode;

function setup() {
    const width = 800;
    const height = 600;

    createCanvas(width, height);
    frameRate(24);

    // wallMaker = new WallsMaker();
    // cheakpoints = new Walls("cheakpoint");
    mode = "pause";
    cars = createCars(1);

    walls = sideWalls(width, height);

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
    stroke(color(0));
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

    stroke(color(200, 100, 250));
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
        stroke(color(200, 100, 250));
        strokeWeight(10);
        point(mouseX, mouseY);
        strokeWeight(1);
    }

    if (mode == "wallBuild") {
        stroke(color(0));
        strokeWeight(10);
        point(mouseX, mouseY);
        strokeWeight(1);
    }

    if (mode == "wallBuild" && walls.length && !walls[walls.length - 1].to) {
        line(
            mouseX,
            mouseY,
            walls[length - 1].from.x,
            walls[length - 1].from.y
        );
    }

    // let carsAlive = false;
    // for (let i = 0; i < cars.length; i++) {
    //     if (!cars[i].isCrashed) {
    //         i = cars.length;
    //         carsAlive = true;
    //     }
    // }
    // if (!carsAlive) {
    //     for (let i = 1; i < cars.length; i++) {
    //         cars[i].network = JSON.parse(findBestCar.network);
    //         if (i != 1) {
    //             Network.mutate(cars[i].network, 0.2);
    //         }
    //     }
    // }

    for (let i = 0; i < cars.length; i++) {
        cars[i].update();
        cars[i].draw(color(255, 0, 0, 50), 0);
    }

    const bestCar = findBestCar();
    bestCar.draw(color(0, 0, 255), 1);
}

function importMap(txt) {
    const coords = JSON.parse(txt);
    walls = coords.walls;
    cheakpoints = coords.cheakpoints;
}

function exportMapToFile() {
    donwloadLink.download = prompt("save file as: ") + ".json";
    const data = new Blob(
        [JSON.stringify({ walls: walls, cheakpoints: cheakpoints })],
        {
            type: "text/plain",
        }
    );
    return window.URL.createObjectURL(data);
}

function saveMap() {
    localStorage.setItem(
        "map",
        JSON.stringify({ walls: walls, cheakpoints: cheakpoints })
    );
}

function removeMap() {
    localStorage.removeItem("map");
}

function saveBestNetwork() {
    localStorage.setItem("network", JSON.stringify(findBestCar().network));
}

function removeBestNetwork() {
    localStorage.removeItem("network");
}

function mouseClicked() {
    if (mode == "wallBuild") {
        const newCoord = { x: Math.round(mouseX), y: Math.round(mouseY) };

        if (!walls.length || walls[walls.length - 1].to) {
            walls.push({ from: newCoord });
        } else {
            walls[walls.length - 1].to = newCoord;
        }
    } else if (mode == "cheakpointBuild") {
        const newCoord = { x: Math.round(mouseX), y: Math.round(mouseY) };

        if (!cheakpoints.length || cheakpoints[cheakpoints.length - 1].to) {
            cheakpoints.push({ from: newCoord });
        } else {
            cheakpoints[cheakpoints.length - 1].to = newCoord;
        }
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
