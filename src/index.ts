type PathData = {
    shape: string;
    points: number[][];
}

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const color = document.querySelector("#color") as HTMLInputElement;
const thickness = document.querySelector("#thickness") as HTMLInputElement;
const eraser = document.querySelector("#eraser") as HTMLButtonElement;
const clear = document.querySelector("#clear") as HTMLButtonElement;
const save = document.querySelector("#save") as HTMLButtonElement;
const undo = document.querySelector("#undo") as HTMLButtonElement;
const redo = document.querySelector("#redo") as HTMLButtonElement;
const brushShapeSelector = document.getElementById("brushShape") as HTMLSelectElement;

const ctx = canvas.getContext("2d")!;

let selectedBrush: string = "circle"; 

let isDrawing: boolean = false;
let lastX: number = 0;
let lastY: number = 0;

let currentPath: PathData = { shape: selectedBrush, points: []}
let points: PathData[] = [];
let redoPoints: PathData[] = [];

ctx.strokeStyle = "#000000";
ctx.lineWidth = 2;
ctx.lineJoin = "round";
ctx.lineCap = "round";

function drawPaths(): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    points.forEach(({ shape, points }) => {
        points.forEach(([x, y]) => {
            const size = ctx.lineWidth * 5;
            switch (shape) {
                case "circle":
                    drawCircle(ctx, x, y, size);
                    break;
                case "square":
                    drawSquare(ctx, x, y, size);
                    break;
                case "triangle":
                    drawTriangle(ctx, x, y, size);
                    break;
                case "heart":
                    drawHeart(ctx, x, y, size);
                    break;
            }
        });
    });
}

function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.rect(x - size / 2, y - size / 2, size, size);
    ctx.fill();
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number): void {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
}

brushShapeSelector.addEventListener("change", (e) => {
    selectedBrush = (e.target as HTMLSelectElement).value;
});

canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    points.push({
        shape: selectedBrush,
        points: [[e.offsetX, e.offsetY]]
    })
});

canvas.addEventListener("mousemove", function (e) {
    if (!isDrawing) return;

    const currentPath = points[points.length - 1];
    currentPath.points.push([e.offsetX, e.offsetY]);

    const size = ctx.lineWidth * 5;
    switch (currentPath.shape) {
        case "circle":
            drawCircle(ctx, e.offsetX, e.offsetY, size);
            break;
        case "square":
            drawSquare(ctx, e.offsetX, e.offsetY, size);
            break;
        case "triangle":
            drawTriangle(ctx, e.offsetX, e.offsetY, size);
            break;
        case "heart":
            drawHeart(ctx, e.offsetX, e.offsetY, size);
            break;
    }
});

undo.addEventListener("click", function(e) {
    if (points.length === 0) {
        alert("Nothing to undo");
        return;
    }
    redoPoints.push(points.pop()!);
    drawPaths();
});

redo.addEventListener("click", function(e) {
    if (redoPoints.length === 0) {
        alert("Nothing to redo");
        return;
    }
    points.push(redoPoints.pop()!);
    drawPaths();
})

canvas.addEventListener("mouseup", function() {
    isDrawing = false;
    points.push(currentPath);
    currentPath = { shape: selectedBrush, points: [] };
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