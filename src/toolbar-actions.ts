import { drawPaths } from './draw-paths.js';

export function setupToolbarActions(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, points: PathData[], redoPoints: PathData[]): void {
    document.querySelector("#clear")!.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        points.length = 0;
        redoPoints.length = 0;
    });

    document.querySelector("#undo")!.addEventListener("click", () => {
        if (points.length > 0) {
            redoPoints.push(points.pop()!);
            drawPaths(ctx, points);
        }
    });

    document.querySelector("#redo")!.addEventListener("click", () => {
        if (redoPoints.length > 0) {
            points.push(redoPoints.pop()!);
            drawPaths(ctx, points);
        }
    });

    document.querySelector("#save")!.addEventListener("click", () => {
        const dataUrl = canvas.toDataURL("image/png", 1.0);
        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = 'drawing.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}
