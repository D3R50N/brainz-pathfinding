// NOTE : The order of the data is important
// ? [LEFT, RIGHT, UP, DOWN]
const LEFT = 0,
    RIGHT = 1,
    UP = 2,
    DOWN = 3;

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

function randomInput(withZero) {
    let input = [];
    for (let i = 0; i < 4; i++) {
        if (withZero)
            input.push(randomBool() ? random(20) : 0);
        else input.push(random(20));
    }
    return input;
}

function randomData(withZero = false) {
    let data = [];
    let data_input = randomInput(withZero);

    let dir_left = dataWithDir([...data_input, LEFT]);
    let dir_right = dataWithDir([...data_input, RIGHT]);
    let dir_up = dataWithDir([...data_input, UP]);
    let dir_down = dataWithDir([...data_input, DOWN]);

    data.push(dir_left);
    data.push(dir_right);
    data.push(dir_up);
    data.push(dir_down);

    return data;
}

function dataWithDir(input = []) {
    let output = [];

    if (input[0] != 0 && input[4] != LEFT)
        output.push(LEFT);
    if (input[1] != 0 && input[4] != RIGHT)
        output.push(RIGHT);
    if (input[2] != 0 && input[4] != UP)
        output.push(UP);
    if (input[3] != 0 && input[4] != DOWN)
        output.push(DOWN);

    let datamodel = new DataModel(input, output);

    return datamodel;
}