const fs = require("fs");

const printFirstLine = function(err, buffer) {
    console.log("2. Got the file:", buffer.toString().substring(0, 21));
}

console.log("1. Start App");

fs.readFile("largeFile.txt", printFirstLine);

console.log("3. End App");