import { setupCanvas } from './canvas-setup.js';
import { setupCanvasEvents } from './event-handlers.js';
// import { setupFileUpload } from './file-upload.js';
import { setupKeyboardShortcuts } from './keyboard-shortcuts.js';
import { redoHandler, setupToolbarActions, undoHandler } from './toolbar-actions.js';
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const color = document.querySelector("#color");
const thickness = document.querySelector("#thickness");
const uploadImage = document.querySelector("#uploadImage");
let baseImage = null;
let points = [];
let redoPoints = [];
let selectedBrush = "circle";
setupCanvas();
setupCanvasEvents(canvas, ctx, points, redoPoints, selectedBrush, thickness, color);
setupToolbarActions(ctx, canvas, points, redoPoints);
setupKeyboardShortcuts(undoHandler, redoHandler);
uploadImage.addEventListener("change", function (e) {
    var _a;
    const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (!file)
        return;
    const reader = new FileReader();
    reader.onload = function (event) {
        var _a;
        baseImage = new Image();
        baseImage.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
            redoPoints.length = 0;
        };
        baseImage.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
    };
    reader.readAsDataURL(file);
});
export { canvas, baseImage, points, redoPoints };
