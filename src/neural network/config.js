const network = new brain.NeuralNetwork();

const training_data = [
    /** NOTE : The order of the data is important
    
    * ? [LEFT, RIGHT, UP, DOWN , previousDir]

    Ex : [1, 0, 3, 0, LEFT]

    An obstacle is at [1] step at the LEFT
    * ? We can go to the LEFT 
   
    An obstacle is at [0] step at the RIGHT
    * ! We can't go to the RIGHT
    
    An obstacle is at [3] steps at the top (UP)
    * ? We can go to the TOP
    
    An obstacle is at [0] step at the bottom (DOWN)
    * ! We can go to the BOTTOM
    
    The last pos is at the [LEFT] of the current pos
    * ! We can't go back to the LEFT
    
    * ? - We can only go to the TOP (UP)
    * */
    new DataModel([11, 0, 13, 0, RIGHT], [LEFT, UP]),
    new DataModel([7, 0, 2, 0, DOWN], [LEFT, UP]),
    new DataModel([1, 0, 3, 0, LEFT], [UP]),
    new DataModel([10, 0, 23, 0, UP], [LEFT]),


];
// Generate some random data 
/**  NOTE - Data without zero means that
 * we can go to all directions
 * because there no {0} as distance from obstacle.
 * 
 * In that case, model should predict the direction 
 * by checking the last position
*/
for (let index = 0; index < 10; index++) {
    let data = randomData(); // without zero
    training_data.push(data[0]);
    training_data.push(data[1]);
    training_data.push(data[2]);
    training_data.push(data[3]);
}
for (let index = 0; index < 10; index++) {
    let data = randomData(true);
    training_data.push(data[0]);
    training_data.push(data[1]);
    training_data.push(data[2]);
    training_data.push(data[3]);
}
network.train(training_data);
// var test = network.run([11, 0, 3, 0, LEFT]);
// debug.table(training_data)
// debug.info(predictedKey(test));