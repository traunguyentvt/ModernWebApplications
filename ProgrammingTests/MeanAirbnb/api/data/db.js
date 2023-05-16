
const mongoose = require("mongoose");
require("./movies-model");

mongoose.connect(process.env.DB_URL, {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function(error) {
    console.log("Mongoose connection error", error);
});

process.on("SIGINT", function() {
    mongoose.connection.close().then(function() {
        console.log("Mongoose disconnected by app disconnect");
        process.exit(0);
    }).catch(function(error) {

    });
});

process.on("SIGTERM", function(req, res) {
    mongoose.connection.close().then(function() {
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    }).catch(function(error) {

    });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close().then(function() {
        console.log("Mongoose disconnected by app restart");
        process.kill(process.pid, "SIGUSR2");
    }).catch(function(error) {

    });
});