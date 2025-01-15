import { setupCanvas } from './canvas-setup.js';
import { setupCanvasEvents } from './event-handlers.js';
import { setupToolbarActions } from './toolbar-actions.js';

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const color = document.querySelector("#color") as HTMLInputElement;
const thickness = document.querySelector("#thickness") as HTMLInputElement;

let points: PathData[] = [];
let redoPoints: PathData[] = [];
let selectedBrush = "circle";

setupCanvas();
setupCanvasEvents(canvas, ctx, points, redoPoints, selectedBrush, thickness, color);
setupToolbarActions(ctx, canvas, points, redoPoints);