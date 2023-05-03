require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();
const server = app.listen(process.env.PORT_NUMBER_EXPRESS, function() {
    console.log("Listening to port:", server.address().port);
});

// app.get("/", function(req, res) {
//     res.status(parseInt(process.env.HTTP_RESPONSE_OK)).sendFile(__dirname + "/public/index.html");
// });

// app.get("/index.html", function(req, res) {
//     res.status(parseInt(process.env.HTTP_RESPONSE_OK)).sendFile(__dirname + "/public/index.html");
// });

// app.get("/page1.html", function(req, res) {
//     res.status(parseInt(process.env.HTTP_RESPONSE_OK)).sendFile(__dirname + "/public/page1.html");
// });

// app.get("/page2.html", function(req, res) {
//     res.status(parseInt(process.env.HTTP_RESPONSE_OK)).sendFile(__dirname + "/public/page2.html");
// });

app.get("/:name?", function(req, res) {
    // console.log(req.params.name);
    // console.log(req.url);
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
    res.status(parseInt(process.env.HTTP_RESPONSE_OK)).sendFile(__dirname + "/public" + fileName);
});

app.post("/:name?", function(req, res) {
    res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({"message" : "Hello World! - JSON type!"});
});

app.use(express.static(path.join(__dirname + "public")));

