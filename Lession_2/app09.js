const http = require("http");

// const server = http.createServer();

const helloWorldResponse = function(req, res) {
    res.writeHeader(200);
    res.end("Hello World!");
}

const server = http.createServer(helloWorldResponse);

server.listen(8080, "localhost", function() {
    console.log("Server is running on http://localhost:8080");
});