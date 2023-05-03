
const child_process = require("child_process");

console.log("1. Start App");

// const newProcess = child_process.spawn("node", ["fibonacci.js"]);
//to print the fibonacci, we need to force the process to the main thread.
const newProcess = child_process.spawn("node", ["fibonacci.js"], {stdio : "inherit"});

console.log("3. End App");