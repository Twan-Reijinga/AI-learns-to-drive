class Network {
    constructor(neuronCounts) {
        this.layers = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            let layer = new Layer(neuronCounts[i], neuronCounts[i + 1]);
            this.layers.push(layer);
        }
    }

    getOutputs(inputs) {
        let outputs = this.layers[0].getOutputs(inputs);
        for (let i = 1; i < this.layers.length; i++) {
            outputs = this.layers[i].getOutputs(inputs);
        }
        return outputs;
    }
}

class Layer {
    constructor(inputCount, outputCount) {
        this.inputCount = inputCount;
        this.outputCount = outputCount;
        this.biases = [];
        this.weights = [];

        this.randomize();
    }

    randomize() {
        for (let i = 0; i < this.outputCount; i++) {
            this.biases[i] = Math.random() * 2 - 1;
        }
        for (let i = 0; i < this.inputCount; i++) {
            this.weights.push([]);
            for (let j = 0; j < this.outputCount; j++) {
                this.weights[i].push(Math.random() * 2 - 1);
            }
        }
    }

    getOutputs(inputs) {
        let outputs = [];
        for (let i = 0; i < this.outputCount; i++) {
            let sum = 0;
            for (let j = 0; j < this.inputCount; j++) {
                sum += inputs[j] * this.weights[j][i];
            }
            if (sum > this.biases[i]) {
                outputs[i] = 1;
            } else {
                outputs[i] = 0;
            }
        }
        return outputs;
    }
}
