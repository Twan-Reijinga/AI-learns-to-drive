let cars = [];
let walls = [];
let cheakpoints = [];
let mode;

function setup() {
    const width = 800;
    const height = 600;

    createCanvas(width, height);
    frameRate(24);
    mode = "pause";
    cars = Car.addCars(1, "AI");

    walls = Walls.sideWalls(width, height);

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
    Walls.draw(color(0));
    Cheakpoints.draw(color(200, 100, 250));

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

    const bestCar = Car.findBestCar(cars);
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
        let lastCoord = walls[walls.length - 1].to;

        if (walls.length && lastCoord && keyIsDown(SHIFT)) {
            walls.push({ from: lastCoord, to: newCoord });
        } else if (!walls.length || lastCoord) {
            walls.push({ from: newCoord });
        } else {
            walls[walls.length - 1].to = newCoord;
        }
    } else if (mode == "cheakpointBuild") {
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
