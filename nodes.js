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
