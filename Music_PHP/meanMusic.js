
require("dotenv").config();
require("./data/db");

const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.LISTENING_TO_PORT_MESSAGE, server.address().port);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname + process.env.PUBLIC_DIRECTORY)));

app.use(process.env.ROUTE_API, routes);