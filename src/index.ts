import { setupCanvas } from './canvas-setup.js';
import { setupCanvasEvents } from './event-handlers.js';
import { setupFileUpload } from './file-upload.js';
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
setupFileUpload(canvas, ctx, redoPoints, baseImage, uploadImage)

export { canvas, baseImage, points, redoPoints }