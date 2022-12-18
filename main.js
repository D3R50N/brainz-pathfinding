function main() {
    clearCanvas();

    for (const element of grid.elements) {
        rect(element.x, element.y, findColor(element.type));
    }

    drawGrid();
    if (move_step >= step_before_move)
        move();
    move_step++;
    requestAnimationFrame(main);
}
main()

loadSizeFromStorage();
loadElementFromStorage();
debug.log(start);
debug.log(end);

