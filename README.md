# AI-learns-to-drive
I made my own machine learning algorithm with reinforcement learning in JavaScript to let the AI drive a car in your own custom build circuit.
[Try it now](https://ailearnstodrive.netlify.app/ "AI learns to drive DEMO")

## How my AI works
You need to pass on to the network how many nodes each layer must have with an array.
(including the amount of inputs and amount of outputs)
So `new Network([4, 6, 4])` creates a Network with 4 input nodes, 6 nodes in the second layer and 4 nodes as an output.<br>


### Weights and biases
In the beginning, the Neural Network creates random values for his weights and biases.
- **Weight:** a value that decides how important a specific node is for a specific node in the next layer.<br>
  for example: if input[0] = 2 and the weight between the first node in the first layer and the first node in the second layer is 0.1, <br>
  the sum is 2 * 0.1 (+ sum of all other input values * their own weights)
- **Bias:** If the outcome of that sum is above the bias, then the value for that node is 1, else 0.


### Mutate
We can mutate the best AI with the mutate function: `Network.mutate(yourNetwork, amountOfDifference)`.
The mutated network is a mix of weights and biases from the old network and new random data.
How random data gets mixed with the old network is determined by the second value.
So, for example: if the amount is set to 0.1, the new values are 0.9 * values for old network + 0.1 * random new values.


### FeedForward
With the feedForward function, you can give your inputs to the AI and the AI will calculate the output with his weights and biases.
You can use the feedforward function with: `Network.feetForward(yourNetwork, yourInputs)`

## Making Your Own Custom circuit
If you open the website, you can choose to draw walls and to draw checkpoints with the buttons. If you hold shift, the last endpoint is used as a begin point for the next wall.
Make sure to put the checkpoints not that far from each other. Click start if you're done and see the AI learn.

You can save the map in your local storage by pressing `save map` end, deleting it by pressing `delete map`.
You can do the same with the best performing neural network at that time.
With the `download` button, you can download the map and best network in a JSON-file and load in later.
