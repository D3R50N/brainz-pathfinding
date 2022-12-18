const cv = document.createElement("canvas");
const cx = cv.getContext("2d");
document.getElementById("board").querySelector(".board-content").appendChild(cv);
const resolution = 1;
const cw = cv.width = resolution * cv.clientWidth;
const ch = cv.height = resolution * cv.clientHeight;

const overlay_cv = document.createElement("canvas");
const overlay_cx = overlay_cv.getContext("2d");
document.getElementById("board").querySelector(".board-content").appendChild(overlay_cv);
const overlay_cb = overlay_cv.getBoundingClientRect();
const overlay_cw = overlay_cv.width = resolution * overlay_cb.width;
const overlay_ch = overlay_cv.height = resolution * overlay_cb.height;

const find_path_btn = document.getElementById("find_path_btn");
const clear_btn = document.getElementById("clear_btn");
const disable_hover_btn = document.getElementById("disable_hover_btn");
const custom_grid_btn = document.getElementById("custom_grid_btn");
const clear_grid_btn = document.getElementById("clear_grid_btn");


const stroke = {
    color: "#aaa",
    width: 1,
    cap: "round",
}

var size = {
    w: 20,
    h: 20,
}

const grid = {
    x_length: cw / size.w,
    y_length: ch / size.h,
    elements: [],
}
const types = {
    START: "start",
    END: "end",
    OBS: "obstacle"
}


var can_click_start = true;
var can_click_end = true;

var is_mouse_left_down = false;
var is_mouse_right_down = false;

var hover_disabled = false;
var is_finding_path = false;

var start = {};
var end = {};