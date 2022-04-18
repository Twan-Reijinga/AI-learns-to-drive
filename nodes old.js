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
        for(let row = 0; row < this.hiddenRows; row++) {
            this.setupLayer(this.hiddenCols);
        }
        
        // outputs
        this.setupLayer(this.outputLength);
        // this.outputs = this.nodes[this.nodes.length - 1]; // ! //
    }

    setupLayer(items) {
        let connections = this.nodes[this.nodes.length - 1];
        let layer = [];
        for(let i = 0; i < items; i++) {
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