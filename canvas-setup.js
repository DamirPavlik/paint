export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d");
export function setupCanvas() {
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
}
