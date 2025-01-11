const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

let isDrawing: boolean = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
})

canvas.addEventListener("mouseup", function() {
    isDrawing = false;
});

canvas.addEventListener("mouseout", function() {
    isDrawing = false;
});