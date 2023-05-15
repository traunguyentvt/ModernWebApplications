
const mongoose = require("mongoose");
require("./trips-model");

mongoose.connect("mongodb://127.0.0.1:27017/meanTrips", {useNewUrlParser:true, useUnifiedTopology:true});

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected");
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
});

mongoose.connection.off("error", function() {
    console.log("Mongoose connection error");
});

process.on("SIGINT", function() {
    mongoose.connection.close().then(function() {
        console.log("Mongoose disconnected");
        process.exit(0);
    }).catch(function(error) {

    });
});

process.on("SIGNTERM", function() {
   mongoose.connection.close().then(function() {
        console.log("Mongoose disconnected");
        process.exit(0);
   }).catch(function(error) {

   });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close().then(function() {
        console.log("Mongoose disconnected");
        process.kill(process.pid, "SIGUSR2");
    }).catch(function(error) {

    });
});