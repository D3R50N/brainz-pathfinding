class DataModel {
    constructor(input = [], output = []) {
        this.input = input;
        this.map_output(output);
    }
    map_output(output = []) {
        let up = 0, down = 0, left = 0, right = 0;
        for (const value of output) {
            if (value === UP) up = 1;
            else if (value === DOWN) down = 1;
            else if (value === LEFT) left = 1;
            else if (value === RIGHT) right = 1;
        }

        this.output = {
            up,
            down,
            left,
            right
        }
    }
    get() {
        return {
            input: this.input,
            output: this.output
        }
    }
}