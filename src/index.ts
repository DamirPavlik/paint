import { setupCanvas } from './canvas-setup.js';
import { setupCanvasEvents } from './event-handlers.js';
// import { setupFileUpload } from './file-upload.js';
import { setupKeyboardShortcuts } from './keyboard-shortcuts.js';
import { redoHandler, setupToolbarActions, undoHandler } from './toolbar-actions.js';

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const color = document.querySelector("#color") as HTMLInputElement;
const thickness = document.querySelector("#thickness") as HTMLInputElement;
const uploadImage = document.querySelector("#uploadImage") as HTMLInputElement;

let baseImage: HTMLImageElement | null = null;
let points: PathData[] = [];
let redoPoints: PathData[] = [];
let selectedBrush = "circle";

setupCanvas();
setupCanvasEvents(canvas, ctx, points, redoPoints, selectedBrush, thickness, color);
setupToolbarActions(ctx, canvas, points, redoPoints);
setupKeyboardShortcuts(undoHandler, redoHandler);

uploadImage.addEventListener("change", function (e) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
        baseImage = new Image();
        baseImage.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseImage!, 0, 0, canvas.width, canvas.height);

            redoPoints.length = 0;
        };
        baseImage.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
});

export { canvas, baseImage, points, redoPoints }