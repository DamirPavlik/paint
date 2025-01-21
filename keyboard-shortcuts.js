export function setupKeyboardShortcuts(undo, redo) {
    window.addEventListener("keydown", function (e) {
        if (e.ctrlKey || e.metaKey) {
            console.log("tu sme");
            if (e.key === "z") {
                console.log("undoooo");
                e.preventDefault();
                undo();
            }
            if (e.key === "y") {
                console.log("redoooo");
                e.preventDefault();
                redo();
            }
        }
    });
}
