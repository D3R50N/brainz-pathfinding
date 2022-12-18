const network = new brain.NeuralNetwork();

const training_data = [
    // NOTE : The order of the data is important
    // ? [LEFT, RIGHT, UP, DOWN]
    new DataModel([1, 0, 3, 0], [LEFT, UP]),


];
// Generate some random data
for (let index = 0; index < 20; index++) {
    training_data.push(randomData());
}
network.train(training_data);
var test = network.run([0, 0, 11, 10]);
// debug.table(training_data)
// debug.info(predictedKey(test));
