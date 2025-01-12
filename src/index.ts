const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const color = document.querySelector("#color") as HTMLInputElement;
const thickness = document.querySelector("#thickness") as HTMLInputElement;
const eraser = document.querySelector("#eraser") as HTMLButtonElement;
const clear = document.querySelector("#clear") as HTMLButtonElement;
const save = document.querySelector("#save") as HTMLButtonElement;
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
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = target.value;
});

thickness.addEventListener("change", function(e) {
    const target = e.target as HTMLInputElement;
    ctx.lineWidth = Number(target.value);
});

eraser.addEventListener("click", function(e) {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = Number(thickness.value);
});

clear.addEventListener("click", function() { 
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
});

save.addEventListener("click", function(e) {
    const dataUrl = canvas.toDataURL("image/png", 1.0);
    const a = document.createElement("a") as HTMLAnchorElement;
    a.href = dataUrl;
    a.download = 'untitled.png';
    document.body.appendChild(a);
    a.click();
});