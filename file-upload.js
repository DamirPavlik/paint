"use strict";
// export function setupFileUpload(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, redoPoints: PathData[], baseImage: HTMLImageElement | null, uploadImage: HTMLInputElement) {
//     uploadImage.addEventListener("change", function (e) {
//         const file = (e.target as HTMLInputElement).files?.[0];
//         if (!file) return;
//         const reader = new FileReader();
//         reader.onload = function (event) {
//             baseImage = new Image();
//             baseImage.onload = function () {
//                 ctx.clearRect(0, 0, canvas.width, canvas.height);
//                 ctx.drawImage(baseImage!, 0, 0, canvas.width, canvas.height);
//                 redoPoints.length = 0;
//             };
//             baseImage.src = event.target?.result as string;
//         };
//         reader.readAsDataURL(file);
//     });
// }
