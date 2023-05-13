
require("dotenv").config();
require("./api/data/db");

const express = require("express");
const app = express();
const path = require("path");
const routes = require("./api/routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const server = app.listen(process.env.HTTP_PORT, function() {
    console.log(process.env.LISTENING_TO_PORT_MESSAGE, server.address().port);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POTS, DELETE");
    next();
});

app.use(express.static(path.join(__dirname + process.env.PUBLIC_DIRECTORY)));

app.use(process.env.ROUTE_API, routes);