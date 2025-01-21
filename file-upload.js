export function setupFileUpload(canvas, ctx, redoPoints, baseImage, uploadImage) {
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
}
