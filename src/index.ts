const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const color = document.querySelector("#color") as HTMLInputElement;
const thickness = document.querySelector("#thickness") as HTMLInputElement;
const ctx = canvas.getContext("2d")!;

let isDrawing: boolean = false;
let lastX: number = 0;
let lastY: number = 0;

ctx.strokeStyle = "#000000";
ctx.lineWidth = 2;
ctx.lineJoin = "round";
ctx.lineCap = "round";

canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", function(e) {
    if (!isDrawing) {
        return;
    }

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mouseup", function() {
    isDrawing = false;
});

canvas.addEventListener("mouseout", function() {
    isDrawing = false;
});

color.addEventListener("change", function(e) {
    const target = e.target as HTMLInputElement;
    ctx.strokeStyle = target.value;
});

thickness.addEventListener("change", function(e) {
    const target = e.target as HTMLInputElement;
    ctx.lineWidth = Number(target.value);
})