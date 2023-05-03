const http = require("http");
const fs = require("fs");
require("dotenv").config();

const serveAllRequests = function(req, res) {
    // console.log(req.url);
    if (req.method == 'POST') {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end("{'message' : 'Hello World! - JSON type!'}");
        return;
    }
    let fileName;
    switch(req.url) {
        case "/": {
            fileName = "/index.html";
            break;
        }
        case "/page1.html": {
            fileName = "/page1.html";
            break;
        }
        case "/page2.html": {
            fileName = "/page2.html";
            break;
        }
        default: {
            fileName = "/index.html";
            break;
        }
    }
    res.setHeader("Content-Type", "text/html");
    let statusCode;
    let fileBuffer;
    fs.readFile(__dirname + "/public" + fileName, function(err, buffer) {
        if (err) {
            statusCode = process.env.HTTP_RESPONSE_NOT_FOUND;
            fileBuffer = process.env.MESSAGE_FIND_NOT_FOUND;
        } else {
            statusCode = process.env.HTTP_RESPONSE_OK;
            fileBuffer = buffer;
        }
        res.writeHead(statusCode);
        res.end(fileBuffer);
    });
}

const serve = http.createServer(serveAllRequests);

serve.listen(process.env.PORT_NUMBER_HTTP, "localhost", function() {
    console.log("Listening to port:", serve.address().port);
});

