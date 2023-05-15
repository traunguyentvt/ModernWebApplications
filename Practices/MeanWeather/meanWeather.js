
require("dotenv").config();
require("./api/data/db");

const express = require("express");
const path = require("path");
const app = express();
const routes = require("./api/routes/routes");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const server = app.listen(3000, function() {
    console.log("Listening to Port" + server.address().port);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Controll-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    next();
});

app.use(express.static(path.join(__dirname + "/public")));

app.use("/api", routes);