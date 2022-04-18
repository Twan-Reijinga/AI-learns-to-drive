class Cars {
    constructor(x, y, amount) {
        this.cars = [];
        this.addCars(x, y, amount);
    }

    draw() {
        for(let i = 0; i < this.cars.length; i++) {
            this.cars[0].draw();
        }
    }

    addCars(x, y, amount) {
        for(let i = 0; i < amount; i++) {
            this.cars.push(new Car(x, y, -1/2*PI));
        }
    }

    rotateAll(rotation) {
        for(let i = 0; i < this.cars.length; i++) {
            this.rotate(i, rotation);
        } 
    }

    rotate(carNum, rotation) {
        this.cars[carNum].rotate(rotation);
    }

    moveAll(direction) {
        for(let i = 0; i < this.cars.length; i++) {
            this.move(i, direction);
        } 
    }

    move(carNum, direction) {
        this.cars[carNum].move(direction);
    }
}

class Car {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        // this.v = createVector(0, 0); // ! importaint
        this.a = createVector(0, 0); // !  cheak?
        
        this.angle = 0;
        this.width = 100;
        this.height = 120;
        this.speed = 0.2;
        this.resistance = 1.04;

        this.img = loadImage('assets/car2.0.png');
        this.rays = new Rays(x, y, 7);
        this.rotate(angle);
    }

    draw() {
        this.x += this.a.x;
        this.y += this.a.y;
        this.a.x /= this.resistance;
        this.a.y /= this.resistance;

        this.rays.drawIntersections();
        this.rays.changeLocation(this.x, this.y);
        push();
        translate(this.x, this.y);
        rotate(this.angle + 1/2 * PI);
        imageMode(CENTER);
        image(this.img, 0, 0, this.width, this.height);
        pop();
    }

    rotate(rotation) {
        this.angle += rotation;
        this.rays.rotate(rotation);
    }

    move(direction) {
        let aX = cos(this.angle) * this.speed * direction;
        let aY = sin(this.angle) * this.speed * direction;
        this.a.add(aX, aY);
    }

    getDistances() {
        return this.rays.getDistances();
    }
}

function createCars(x, y, amount) {
    cars = [];
    for(let i = 0; i < amount; i++) {
        cars.push(new Car(x, y, -1/2*PI));
    }
    return cars;
}