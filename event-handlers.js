import { selectedBrush } from "./brush-shapes.js";
import { drawCircle, drawSquare, drawTriangle, drawHeart } from "./brush-shapes.js";
import { drawPaths } from './draw-paths.js';
const brushShapeSelector = document.getElementById("brushShape");
let isDrawing = false;
export function setupCanvasEvents(canvas, ctx, points, redoPoints, selectedBrush, thicknessInput, colorInput) {
    let isDrawing = false;
    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        points.push({
            shape: selectedBrush,
            points: [[e.offsetX, e.offsetY]],
            thickness: ctx.lineWidth,
            color: ctx.strokeStyle,
        });
    });
    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing)
            return;
        const currentPath = points[points.length - 1];
        currentPath.points.push([e.offsetX, e.offsetY]);
        drawPaths(ctx, points);
    });
    brushShapeSelector.addEventListener("change", function (e) {
        selectedBrush = e.target.value;
    });
    canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        drawPaths(ctx, points);
    });
    canvas.addEventListener("mouseout", () => {
        isDrawing = false;
    });
    colorInput.addEventListener("input", (e) => {
        ctx.strokeStyle = e.target.value;
    });
    thicknessInput.addEventListener("change", (e) => {
        ctx.lineWidth = Number(e.target.value);
    });
}
export function handleMouseDown(ctx, points, canvas, e) {
    isDrawing = true;
    points.push({
        shape: selectedBrush,
        points: [[e.offsetX, e.offsetY]],
        thickness: ctx.lineWidth,
        color: ctx.strokeStyle,
    });
}
export function handleMouseMove(ctx, points, canvas, e) {
    if (!isDrawing)
        return;
    const currentPath = points[points.length - 1];
    const [lastX, lastY] = currentPath.points[currentPath.points.length - 1];
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    const dx = currentX - lastX;
    const dy = currentY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = ctx.lineWidth;
    for (let t = 0; t <= 1; t += step / distance) {
        const x = lastX + t * dx;
        const y = lastY + t * dy;
        currentPath.points.push([x, y]);
        const size = ctx.lineWidth * 5;
        switch (currentPath.shape) {
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
    }
}
