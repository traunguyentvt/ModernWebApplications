
const mongoose = require("mongoose");
require("./weather-model");

mongoose.connect("mongodb://127.0.0.1:27017/meanWeather", {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function() {
    console.log("MG connected");
});

mongoose.connection.on("disconnected", function() {
    console.log("MG disconnected");
});

mongoose.connection.on("error", function(error) {
    console.log("MG connection error", error);
});

process.on("SIGINT", function() {
    mongoose.connection.close().then(function() {
        console.log("MG disconnected");
        process.exit(0);
    }).catch(function(error) {

    });
});

process.on("SIGTERM", function() {
    mongoose.connection.close().then(function() {
        console.log("MG disconnected");
        process.exit(0);
    }).catch(function(error) {

    });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close().then(function() {
        console.log("MG disconnected");
        process.kill(process.pid, "SIGUSR2");
    }).catch(function(error) {

    });
});