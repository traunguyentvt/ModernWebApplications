
const mongoose = require("mongoose");
const callbackify = require("util").callbackify;
require("./songs-model");

mongoose.connect(process.env.DB_URL, { useNewUrlParser : true, useUnifiedTopology : true });

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to " + process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function(err) {
    console.log("Mongoose connection error", err);
});

process.on("SIGINT", function() {
    const closeWithCallback = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallback(function() {
        console.log("Mongoose diconnected by app disconnect");
        process.exit(0);
    });
});

process.on("SIGTERM", function() {
    const closeWitchCallback = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWitchCallback(function() {
        console.log("Mongoose disconnected by app termination");
        process.exit(0);
    });
});

process.on("SIGUSR2", function() {
    const closeWithCallback = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallback(function() {
        console.log("Mongoose disconnected by app restart");
        process.kill(process.pid, "SIGUSR2");
    });
});