let cars;
let walls;
let gameMode;
// let network;

function setup() {
    const width  = 800;
    const height = 600;

    createCanvas(width, height);
    frameRate(60);
    
    walls = new Walls();
    cars  = new Cars(200, 200, 1);
    gameMode = "draw";
    // network = new Network();
}

function draw() {
    background(220);
    walls.draw();
    cars.update();
    
    if(gameMode == "human") {
        if(keyIsDown(UP_ARROW)) {
            cars.moveAll(1);
        } 
        if (keyIsDown(LEFT_ARROW)) {
            cars.rotateAll(-0.01*PI);
        } 
        if (keyIsDown(DOWN_ARROW)) {
            cars.moveAll(-1);
        } 
        if (keyIsDown(RIGHT_ARROW)) {
            cars.rotateAll(0.01*PI);
        }
    }

    // - gameMode switch - //
    if(keyIsDown(49)) {   // 1 //
        gameMode = "draw";
    }
    if(keyIsDown(50)) {   // 2 //
        gameMode = "human"
    }
    if(keyIsDown(51)) {   // 3 //
        gameMode = "selfDriving";
    }
}

function mouseClicked() {
    if(gameMode == "draw") {
        walls.addCoord(mouseX, mouseY);
    }
}
