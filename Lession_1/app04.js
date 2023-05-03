
const fs = require("fs");
console.log("1. Start App");

const buffer = fs.readFileSync("largeFile.txt");
console.log("2. Got the file:", buffer.toString().substring(0, 21));

console.log("3. End App");