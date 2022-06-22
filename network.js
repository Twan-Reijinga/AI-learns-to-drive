class Network {
    constructor(neuronCounts) {
        this.layers = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            let layer = new Layer(neuronCounts[i], neuronCounts[i + 1]);
            this.layers.push(layer);
        }
    }

    static feedForward(network, inputs) {
        let outputs = Layer.feedForward(network.layers[0], inputs);
        for (let i = 1; i < network.layers.length; i++) {
            outputs = Layer.feedForward(network.layers[i], inputs);
        }
        return outputs;
    }

    static mutate(network, amount = 1) {
        network.layers.forEach((level) => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount
                );
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount
                    );
                }
            }
        });
    }
}

class Layer {
    constructor(inputCount, outputCount) {
        this.inputCount = inputCount;
        this.outputCount = outputCount;
        this.biases = [];
        this.weights = [];

        Layer.#randomize(this);
    }

    static #randomize(layer) {
        for (let i = 0; i < layer.outputCount; i++) {
            layer.biases[i] = Math.random() * 2 - 1;
        }
        for (let i = 0; i < layer.inputCount; i++) {
            layer.weights.push([]);
            for (let j = 0; j < layer.outputCount; j++) {
                layer.weights[i].push(Math.random() * 2 - 1);
            }
        }
    }

    static feedForward(layer, inputs) {
        let outputs = [];
        for (let i = 0; i < layer.outputCount; i++) {
            let sum = 0;
            for (let j = 0; j < layer.inputCount; j++) {
                sum += inputs[j] * layer.weights[j][i];
            }
            if (sum > layer.biases[i]) {
                outputs[i] = 1;
            } else {
                outputs[i] = 0;
            }
        }
        return outputs;
    }
}
