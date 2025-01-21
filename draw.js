"use strict";
function drawPaths() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
function drawCircle(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
}
function drawSquare(ctx, x, y, size) {
    ctx.beginPath();
    ctx.rect(x - size / 2, y - size / 2, size, size);
    ctx.fill();
}
function drawTriangle(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
}
function drawHeart(ctx, x, y, size) {
    const topCurveHeight = size * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y - topCurveHeight, x - size / 2, y + size / 2, x, y + size);
    ctx.bezierCurveTo(x + size / 2, y + size / 2, x + size / 2, y - topCurveHeight, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
}
