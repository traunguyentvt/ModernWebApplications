
require("dotenv").config();
require("./data/dbconnection").open();

const express = require("express");
const path = require("path");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to Port", server.address().port);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use("/api", routes);

app.use(express.static(path.join(__dirname + process.env.PUBLIC_DIRECTORY)));