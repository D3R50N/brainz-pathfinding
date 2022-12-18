// NOTE : The order of the data is important
// ? [LEFT, RIGHT, UP, DOWN]
const LEFT = 0, RIGHT = 1, UP = 2, DOWN = 3;

function predictedKey(obj = {}) {
    let max = 0;
    let maxKey = null;
    for (let key in obj) {
        if (obj[key] >= max) {
            max = obj[key];
            maxKey = key;
        }
    }
    return maxKey;
}
function random(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomBool() {
    return random(1) === 1;
}
function randomInput() {
    let input = [];
    for (let i = 0; i < 4; i++) {
        input.push(randomBool() ? random(20) : 0);
    }
    return input;
}

function randomData() {
    let data_input = randomInput();
    let data_output = [];

    if (data_input[0] != 0)
        data_output.push(LEFT);
    if (data_input[1] != 0)
        data_output.push(RIGHT);
    if (data_input[2] != 0)
        data_output.push(UP);
    if (data_input[3] != 0)
        data_output.push(DOWN);

    let datamodel = new DataModel(data_input, data_output);

    return datamodel;
}
