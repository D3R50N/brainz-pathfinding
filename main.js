function main() {
    clearCanvas();

    for (const element of grid.elements) {
        rect(element.x, element.y, findColor(element.type));
    }

    drawGrid();
    requestAnimationFrame(main);
}



main();
loadSizeFromStorage();
loadElementFromStorage();