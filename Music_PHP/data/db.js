
const mongoose = require("mongoose");
const { callbackify } = require("util");
require("./songs-model");

mongoose.connect(process.env.DB_URL, { useNewUrlParser : true, useUnifiedTopology : true });

mongoose.connection.on("connected", function() {
    console.log(process.env.MONGOOSE_CONNECTED_TO_MESSAGE + process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function() {
    console.log(process.env.MONGOOSE_DISCONNECTED_MESSAGE);
});

mongoose.connection.on("error", function(err) {
    console.log(process.env.MONGOOSE_CONNECTION_ERROR_MESSAGE, err);
});

process.on("SIGINT", function() {
    const closeWithCallbackify = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallbackify(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGTERM", function() {
    const closeWithCallbackify = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallbackify(function() {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGUSR2", function() {
    const closeWithCallbackify = callbackify(function() {
        return mongoose.connection.close();
    });
    closeWithCallbackify(function() {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, "SIGUSR2");
    });
});