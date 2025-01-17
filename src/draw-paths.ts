import { drawCircle, drawSquare, drawTriangle, drawHeart } from './brush-shapes.js';
import { baseImage, canvas } from './index.js';

export function drawPaths(ctx: CanvasRenderingContext2D, points: PathData[]): void {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (baseImage) {
      ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    }

    points.forEach(({ shape, points, thickness, color }) => {
        ctx.lineWidth = thickness;
        ctx.fillStyle = color;

        points.forEach(([x, y]) => {
          const size = thickness * 5;
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
