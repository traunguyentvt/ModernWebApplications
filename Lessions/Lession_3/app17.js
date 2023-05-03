// ~x.y.z => get version [x.y.x to x.y+1.0) => [: lay luon gia tri bien, ): ko lay gia tri bien
// ^x.y.z => get version [x.y.z to x+1.0.0)
// x.y.x => get exactly the value

console.log("1. Start App");

require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();
const serve = app.listen(process.env.PORT_NUMBER_HTTP, function() {
    console.log("Listening to port:", serve.address().port);
});

app.get("/", function(req, res) {
    res.status(parseInt(process.env.HTTP_RESPONSE_OK));
    res.send("Hello xyz");
});

// app.get("/index", function(req, res) {
//     res.status(parseInt(process.env.HTTP_RESPONSE_OK)).sendFile(__dirname+"/index.html");
// });

app.get("/json", function(req, res) {
    res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({"message" : "Hello World"});
});

app.use(express.static(path.join(__dirname+"")));

//using sub-set route
app.use("static", express.static(path.join(__dirname + "public")));
//=> access by static not public: change name => group and orginaze source codes

console.log("3. Start App");