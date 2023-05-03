
const http = require("http");
const fs = require("fs");

const helloWorldHtml = function(req, res) {
    res.writeHeader(200);
    res.end("<html> <body> <h1>Hello World! </h1> </body> </html>");
}

const hellowWorldHtmlFile = function(req, res) {
    res.writeHeader(200);
    const buffer = fs.readFileSync(__dirname + "/index.html");
    res.end(buffer);
}

const helloWorldJSON = function(req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHeader(200);
    res.end("{'message' : 'Hello World!'}");
}

const server = http.createServer(hellowWorldHtmlFile);

server.listen(8080, "localhost", function() {
    console.log("Server is running on http://localhost:8080");
});