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
        debug.warn("Already in grid as '" + alreadyInGrid(x, y).type + "' !");
        return;
    }

    let type = currentType();

    if (type == types.START) {
        can_click_start = false;
        start = {
            x,
            y,
            type: type,
        }
        grid.elements.push(start);

    } else if (type == types.END) {
        can_click_end = false;
        end = {
            x,
            y,
            type: type,
        }
        grid.elements.push(end);

    } else {
        grid.elements.push({
            x,
            y,
            type: type,
        });

    }


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
        if (el.type == types.START) {
            can_click_start = false;
            start = el;
        }
        if (el.type == types.END) {
            can_click_end = false;
            end = el;
        }
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

function getDistances() {
    // debug.warn("Elements in row " + start.y + ":");
    // debug.log(getElementsInSameRow(start));

    // debug.warn("Elements in column " + start.x + ":");
    // debug.log(getElementsInSameColumn(start));

    let distances = [
        start.x,
        size.w - start.x - 1,
        start.y,
        size.h - start.y - 1,
    ]

    let mindistances = distances;

    getElementsInSameRow(start).forEach(row_neighbor => {
        if (row_neighbor.type == types.OBS) {
            if (row_neighbor.x < start.x) {
                if (start.x - row_neighbor.x - 1 < mindistances[0]) {
                    distances[0] = start.x - row_neighbor.x - 1;
                }
            } else if (row_neighbor.x > start.x) {
                if (row_neighbor.x - start.x - 1 < mindistances[1]) {
                    distances[1] = row_neighbor.x - start.x - 1;
                }
            }
        }
    })

    getElementsInSameColumn(start).forEach(col_neighbor => {
        if (col_neighbor.type == types.OBS) {
            if (col_neighbor.y < start.y) {
                if(start.y - col_neighbor.y - 1 < mindistances[2])
                distances[2] = start.y - col_neighbor.y - 1;
            } else if (col_neighbor.y > start.y) {
                if(col_neighbor.y - start.y - 1 < mindistances[3])
                distances[3] = col_neighbor.y - start.y - 1;
            }
        }
    })


    return distances;
}

function getElementsInSameRow(pos) {
    let elements = [];
    for (const element of grid.elements) {
        if (element.y == pos.y && element.x != pos.x) {
            elements.push(element);
        }
    }
    return elements;
}

function getElementsInSameColumn(pos) {
    let elements = [];
    for (const element of grid.elements) {
        if (element.x == pos.x && element.y != pos.y) {
            elements.push(element);
        }
    }
    return elements;
}