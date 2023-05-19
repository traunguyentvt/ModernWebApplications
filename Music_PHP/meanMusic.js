
require("dotenv").config();
require("./api/data/db");

const express= require("express");
const app= express();
const path= require("path");
const routes= require("./api/routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(process.env.HTTP_PORT, function() {
    console.log(process.env.LISTENING_TO_PORT_MESSAGE, server.address().port);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", function(req, res, next) {
    res.header(process.env.HTTP_HEADER_ACCESS_ALLOW_CONTROL_ORIGIN, process.env.ANGULAR_APP_URL);
    res.header(process.env.HTTP_HEADER_ACCESS_ALLOW_CONTROL_HEADERS, process.env.HTTP_HEADER_VALUE_ACCESS_ALLOW_CONTROL_HEADERS);
    res.header(process.env.HTTP_HEADER_ACCESS_ALLOW_CONTROL_METHODS, process.env.HTTP_HEADER_VALUE_ACCESS_ALLOW_CONTROL_METHODS);
    next();
});

app.use(express.static(path.join(__dirname + process.env.PUBLIC_DIRECTORY)));

app.use(process.env.ROUTE_API, routes);