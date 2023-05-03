
const fs = require("fs");

console.log("1. Start App");

fs.readFile("largeFile.txt", function(err, buffer) {
    console.log("2. Got the file:", buffer.toString().substring(0, 20));
});

console.log("3. End App");