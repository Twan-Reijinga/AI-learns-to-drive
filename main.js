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
    cars = Car.addCars(250, "AI");

    walls = Walls.sideWalls(width, height);

    if (localStorage.getItem("map")) {
        importMap(localStorage.getItem("map"));
    }

    if (localStorage.getItem("network") && cars[0].controlType == "AI") {
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

    const bestCar = Car.findBestCar(cars);
    let carsAlive = false;
    for (let i = 0; i < cars.length; i++) {
        if (!cars[i].isCrashed) {
            i = cars.length;
            carsAlive = true;
        }
    }
    if (!carsAlive && bestCar.network) {
        const bestNetwork = JSON.stringify(bestCar.network);
        cars = Car.addCars(cars.length, "AI");

        for (let i = 0; i < cars.length; i++) {
            cars[i].network = JSON.parse(bestNetwork);
            if (i != 0) {
                Network.mutate(cars[i].network, 0.2);
            }
        }
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update();
        cars[i].draw(color(255, 0, 0, 20), 0);
    }
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
    walls = Walls.sideWalls(800, 600);
}

function saveBestNetwork() {
    localStorage.setItem(
        "network",
        JSON.stringify(Car.findBestCar(cars).network)
    );
}

function removeBestNetwork() {
    localStorage.removeItem("network");
}

function mouseClicked() {
    if (mode == "wallBuild") {
        Walls.build();
    } else if (mode == "cheakpointBuild") {
        Cheakpoints.build();
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
