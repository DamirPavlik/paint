import { ctx } from './canvas-setup.js';
import { drawPaths } from './draw-paths.js';
import { points, redoPoints } from './index.js';

const clear = document.querySelector("#clear") as HTMLButtonElement;
const undo = document.querySelector("#undo") as HTMLButtonElement;
const redo = document.querySelector("#redo") as HTMLButtonElement;
const save = document.querySelector("#save") as HTMLButtonElement;

export function undoHandler() {
    if (points.length > 0) {
        redoPoints.push(points.pop()!);
        drawPaths(ctx, points);
    }
}

export function redoHandler() {
    if (redoPoints.length > 0) {
        points.push(redoPoints.pop()!);
        drawPaths(ctx, points);
    }
}

export function setupToolbarActions(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, points: PathData[], redoPoints: PathData[]): void {
    clear.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points.length = 0;
        redoPoints.length = 0;
    });

    undo.addEventListener("click", () => {
        if (points.length > 0) {
            redoPoints.push(points.pop()!);
            drawPaths(ctx, points);
        }
    });

    redo.addEventListener("click", () => {
        if (redoPoints.length > 0) {
            points.push(redoPoints.pop()!);
            drawPaths(ctx, points);
        }
    });

    save.addEventListener("click", () => {
        const dataUrl = canvas.toDataURL("image/png", 1.0);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = 'drawing.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}
