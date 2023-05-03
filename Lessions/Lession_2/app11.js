const http = require("http");
const fs = require("fs");

const helloWorldHtmlAsyn = function(req, res) {
    
}

const server = http.createServer(helloWorldHtmlAsyn);

server.listen(8080, "localhost", function() {
    console.log("Server is running on http://localhost:8080");
});