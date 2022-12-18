
///NOTE - Buttons events
clear_grid_btn.addEventListener('click', e => {
    if (!confirm("Are you sure ?")) return;
    grid.elements = [];
    saveGrid();
})

custom_grid_btn.addEventListener('click', e => {
    if (!confirm("This will reinit the grid. Continue ?")) return;

    var w = prompt("Grid with (>=3) ", 10).trim();
    var h = prompt("Grid height (>=3)", 10).trim();

    if (w == "" || isNaN(parseInt(w)) || parseInt(w) < 3) {
        alert("Invalid width");
        return;
    }
    if (h == "" || isNaN(parseInt(h)) || parseInt(h) < 3) {
        alert("Invalid height");
        return;
    }

    size.w = w;
    size.h = h;

    grid.x_length = cw / size.w;
    grid.y_length = ch / size.h;
    grid.elements = [];
    saveGrid();

})

disable_hover_btn.addEventListener('click', e => {
    hover_disabled = !hover_disabled;
    clearCanvas(overlay_cx)
    disable_hover_btn.innerText = hover_disabled ? "Enable hover" : "Disable hover";
})

find_path_btn.addEventListener('click', e => {
    is_finding_path = !is_finding_path;
    find_path_btn.innerText = !is_finding_path ? "Find path" : "Stop finding";
})



///NOTE - Canvas events
overlay_cv.addEventListener('mousedown', e => {
    if (e.button == 0)
        is_mouse_left_down = true;
    if (e.button == 2)
        is_mouse_right_down = true;

});
overlay_cv.addEventListener('mouseup', e => {
    is_mouse_left_down = false;
    is_mouse_right_down = false;
});
overlay_cv.addEventListener('mouseout', e => {
       clearCanvas(overlay_cx)

});
overlay_cv.addEventListener('mousemove', e => {
    if (hover_disabled) return;
    const x = Math.floor(e.offsetX / grid.x_length);
    const y = Math.floor(e.offsetY / grid.y_length);

    drawHoverSquare(x, y);
    overlay_cx.font = "20px Arial";

    if (is_mouse_left_down)
        addElement(e);
    if (is_mouse_right_down)
        removeElement(e);
    // overlay_cx.fillText(x + "," + y, x * grid.x_length, y * grid.y_length)
})

overlay_cv.addEventListener('click', e => {
    addElement(e);
})
overlay_cv.addEventListener('contextmenu', e => {
    e.preventDefault()
    removeElement(e);
})

