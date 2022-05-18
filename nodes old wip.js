// ! old //
class Network {
    constructor() {
        this.net = new brain.NeuralNetwork();
        this.trainingData = [];
        this.temp = 0;
    }

    addTrainingData(input, output) {
        let newData = {
            input: input,
            output: output
        };
        this.trainingData.push(newData);
    }

    startTraining() {
        if (this.trainingData.length) {
            console.log(this.trainingData);
            this.net.train(this.trainingData);
            this.temp++;
        }
    }

    getOutput(input) {
        if (this.temp) {
            let output = this.net.run(input);
            console.log("up " + output["up"]);
            console.log("left " + output["left"]);
            console.log("down " + output["down"]);
            console.log("right " + output["right"]);
        }
    }
}

// ! old old //
class Network {
    constructor(car) {
        this.inputs = car.getDistances();
        this.hiddenRows = 2;
        this.hiddenCols = 7;
        this.outputLength = 4;
        // this.outputs = []; // ! //

        this.nodes = [];
        this.setupNodes();
        console.log(this.nodes);
    }

    setupNodes() {
        this.nodes.push(this.inputs);
        for (let row = 0; row < this.hiddenRows; row++) {
            this.setupLayer(this.hiddenCols);
        }

        // outputs
        this.setupLayer(this.outputLength);
        // this.outputs = this.nodes[this.nodes.length - 1]; // ! //
    }

    setupLayer(items) {
        let connections = this.nodes[this.nodes.length - 1];
        let layer = [];
        for (let i = 0; i < items; i++) {
            layer.push(new Node(connections));
        }
        this.nodes.push(layer);
    }
}

class Node {
    constructor(connections) {
        this.connections = connections;
    }
}
