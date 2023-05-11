
require("./games-model");
const mongoose = require("mongoose");
const callbackify = require("util").callbackify;

mongoose.connect(process.env.DB_LINK, { useNewUrlParser : true, useUnifiedTopology : true });

mongoose.connection.on("connected", function() {
    console.log("MongoDB connected to " + process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function() {
    console.log("MongoDB disconnected");
});

mongoose.connection.on("error", function(error) {
    console.log("MongoDB connection error", error);
});

process.on("SIGINT", function() {
    const closeWithCallback = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallback(function() {
        console.log("MongoDB disconnected by app disconnect");
        process.exit(0);
    });
});

process.on("SIGTERM", function() {
    const closeWithCallback = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallback(function() {
        console.log("MongoDB disconnected by app termination");
        process.exit(0);
    });
});

process.on("SIGUSR2", function() {
    const closeWithCallback = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallback(function() {
        console.log("MongoDB disconnected by app restart");
        process.kill(process.pid, "SIGUSR2");
    });
});


