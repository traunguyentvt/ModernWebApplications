
const mongoose = require("mongoose");
require("./jobopening-model");

mongoose.connect("mongodb://127.0.0.1:27017/jobsearch", {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function() {
    console.log("error");
});

process.on("SIGINT", function() {
    mongoose.connection.close().then(function() {

    }).catch(function(error) {

    });
});

process.on("SIGTERM", function() {
    mongoose.connection.close().then(function() {

    }).catch(function() {

    });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close().then(function() {
        process.kill(process.pid, "SIGUSR2");
    }).catch(function(error) {

    });
});