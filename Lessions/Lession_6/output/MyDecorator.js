export function Token(token) {
    return function (constructor) {
        constructor.prototype.course = token.course;
        constructor.prototype.canProgram = token.canProgram;
        if (token.canProgram) {
            constructor.prototype.program = function () {
                console.log("I am programming...");
            };
        }
    };
}
