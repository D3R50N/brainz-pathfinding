///NOTE - Drawing functions

function drawGrid() {
    cx.strokeStyle = stroke.color;
    cx.lineWidth = stroke.width;
    cx.lineCap = stroke.cap;
    for (let i = 0; i < cw; i += grid.x_length) {
        cx.beginPath();
        cx.moveTo(i, 0);
        cx.lineTo(i, ch);
        cx.stroke();
        cx.closePath();
    }
    for (let i = 0; i < ch; i += grid.y_length) {
        cx.beginPath();
        cx.moveTo(0, i);
        cx.lineTo(cw, i);
        cx.stroke();
        cx.closePath();
    }
}
function drawHoverSquare(x, y) {
    overlay_cx.clearRect(0, 0, overlay_cw, overlay_ch);
    overlay_cx.fillStyle = findColor(currentType());
    overlay_cx.fillRect(x * grid.x_length, y * grid.y_length, grid.x_length, grid.y_length);
}
function clearCanvas(context = cx) {
    context.clearRect(0, 0, cw, ch);
}
function rect(x, y, color) {
    cx.fillStyle = color;
    cx.fillRect(x * grid.x_length, y * grid.y_length, grid.x_length, grid.y_length);
}
///NOTE - Grid elements functions

function alreadyInGrid(x, y) {
    for (const element of grid.elements) {
        if (element.x == x && element.y == y) {
            return element;
        }
    }
    return null;
}
function saveGrid() {
    localStorage.setItem("grid", JSON.stringify(grid.elements));
    localStorage.setItem("size", JSON.stringify(size));

}
function addElement(e) {
    const x = Math.floor(e.offsetX / grid.x_length);
    const y = Math.floor(e.offsetY / grid.y_length);

    if (alreadyInGrid(x, y) != null) {
        // alert("Already in grid as '" + alreadyInGrid(x, y).type + "' !");
        return;
    }

    let type = currentType();

    if (type == types.START)
        can_click_start = false;
    if (type == types.END)
        can_click_end = false;

    grid.elements.push({
        x: x,
        y: y,
        type: type,
    });

    saveGrid();

}
function removeElement(e) {
    const x = Math.floor(e.offsetX / grid.x_length);
    const y = Math.floor(e.offsetY / grid.y_length);

    let old = alreadyInGrid(x, y);
    if (old != null) {
        if (old.type == types.START)
            can_click_start = true;
        if (old.type == types.END)
            can_click_end = true;
        grid.elements.splice(grid.elements.indexOf(old), 1);
        saveGrid();
        return;
    }
}

///NOTE - Storage functions

function loadSizeFromStorage() {
    let stored = localStorage.getItem("size");
    if (stored == null)
        return;
    size = JSON.parse(stored);
    grid.x_length = cw / size.w;
    grid.y_length = ch / size.h;
}
function loadElementFromStorage() {
    let stored = localStorage.getItem("grid");
    if (stored == null)
        return;
    grid.elements = JSON.parse(stored);
    for (const el of grid.elements) {
        if (el.type == types.START)
            can_click_start = false;
        if (el.type == types.END)
            can_click_end = false;
    }
}


/// NOTE - Other functions

function currentType() {
    if (can_click_start)
        return types.START;
    if (can_click_end)
        return types.END;
    return types.OBS;
}
function findColor(type) {
    return type == types.START ? "rgba(144,238,144,.7)" : type == types.END ? "rgba(220,20,60,.7)" : "#16a6aDaa";
}
