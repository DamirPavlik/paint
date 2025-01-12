const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const color = document.querySelector("#color") as HTMLInputElement;
const thickness = document.querySelector("#thickness") as HTMLInputElement;
const eraser = document.querySelector("#eraser") as HTMLButtonElement;
const clear = document.querySelector("#clear") as HTMLButtonElement;
const save = document.querySelector("#save") as HTMLButtonElement;
const undo = document.querySelector("#undo") as HTMLButtonElement;
const ctx = canvas.getContext("2d")!;

let isDrawing: boolean = false;
let lastX: number = 0;
let lastY: number = 0;

let currentPath: number[][] = [];
let points: number[][][] = [];

ctx.strokeStyle = "#000000";
ctx.lineWidth = 2;
ctx.lineJoin = "round";
ctx.lineCap = "round";

function drawPaths(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    points.forEach(path => {
        if (path.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(path[0][0], path[0][1]);
        for (let i = 1; i < path.length; ++i) {
            ctx.lineTo(path[i][0], path[i][1]);
        }
        ctx.stroke();
    });

    if (currentPath.length > 1) {
        ctx.beginPath();
        ctx.moveTo(currentPath[0][0], currentPath[0][1]);
        for (let i = 1; i < currentPath.length; i++) {
            ctx.lineTo(currentPath[i][0], currentPath[i][1]);
        }
        ctx.stroke();
    }
}

canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    currentPath = [[e.offsetX, e.offsetY]];
});

canvas.addEventListener("mousemove", function(e) {
    if (!isDrawing) return;

    currentPath.push([e.offsetX, e.offsetY])
    drawPaths();
});

undo.addEventListener("click", function(e) {
    points.pop();
    drawPaths();
});

canvas.addEventListener("mouseup", function() {
    isDrawing = false;
    points.push(currentPath);
    currentPath = [];
    drawPaths();
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