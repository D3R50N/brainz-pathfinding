function main() {
    clearCanvas();

    for (const element of grid.elements) {
        rect(element.x, element.y, findColor(element.type));
    }

    drawGrid();
        move();
    // requestAnimationFrame(main);
}

setInterval(main, 1000 / 2);

loadSizeFromStorage();
loadElementFromStorage();
debug.log(start);
debug.log(end);

function move() {
    let distances = getDistances();
debug.info(predictedKey(network.run(distances)))
    switch (predictedKey(network.run(distances))) {
        case "up":
            start.y--;
            break;
        case "down":
            start.y++;
            break;
        case "left":
            start.x--;
            break;
        case "right":
            start.x++;

        default:
            break;
    }
}