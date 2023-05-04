require("dotenv").config();

const express = require("express");
const path = require("path");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

const server = app.listen(process.env.PORT, function() {
    console.log("Listening to Port", server.address().port);
});

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// //can filter by add name
// app.use("/css", function(req, res, next) {
//     console.log(req.method, req.url);
//     next();
// });

// app.get("/json", function(req, res) {
//     res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({message : "JSON Data"});
// });

// app.use("/", routes);

// //can name for each route
app.use("/api", routes);

app.use(express.static(path.join(__dirname + "/public")));
// app.use("/static", express.static(path.join(__dirname + "/public")));