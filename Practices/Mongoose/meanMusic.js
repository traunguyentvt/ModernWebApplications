require("dotenv").config();
require("./data/db");

const path = require("path");
const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to Port", server.address().port);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname + "/public")));

app.use("/api", routes);