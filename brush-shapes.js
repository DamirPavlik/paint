let selectedBrush = "circle";
export function setupBrushShapeSelector(selector) {
    selector.addEventListener("change", (e) => {
        selectedBrush = e.target.value;
    });
}
export function drawCircle(ctx, x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
}
export function drawSquare(ctx, x, y, size) {
    ctx.beginPath();
    ctx.rect(x - size / 2, y - size / 2, size, size);
    ctx.fill();
}
export function drawTriangle(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x - size / 2, y + size / 2);
    ctx.lineTo(x + size / 2, y + size / 2);
    ctx.closePath();
    ctx.fill();
}
export function drawHeart(ctx, x, y, size) {
    const topCurveHeight = size * 0.3;
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y - topCurveHeight, x - size / 2, y + size / 2, x, y + size);
    ctx.bezierCurveTo(x + size / 2, y + size / 2, x + size / 2, y - topCurveHeight, x, y + size / 4);
    ctx.closePath();
    ctx.fill();
}
export { selectedBrush };
