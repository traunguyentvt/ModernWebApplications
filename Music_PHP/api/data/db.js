
const mongoose = require("mongoose");
require("./songs-model");
require("./users-model");


mongoose.connect(process.env.DB_URL, { useNewUrlParser : true, useUnifiedTopology : true });

mongoose.connection.on(process.env.MONGOOSE_CONNECTED, function() {
    console.log(process.env.MONGOOSE_CONNECTED_TO_MESSAGE + process.env.DB_NAME);
});

mongoose.connection.on(process.env.MONGOOSE_DISCONNECTED, function() {
    console.log(process.env.MONGOOSE_DISCONNECTED_MESSAGE);
});

mongoose.connection.on(process.env.MONGOOSE_ERROR, function(err) {
    console.log(process.env.MONGOOSE_CONNECTION_ERROR_MESSAGE, err);
});

process.on(process.env.PROCESS_SIGINT, function() {
    mongoose.connection.close().then(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    })
    .catch(function(error) {

    });
});

process.on(process.env.PROCESS_SIGTERM, function() {
    mongoose.connection.close().then(function() {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    })
    .catch(function(error) {

    });
});

process.on(process.env.PROCESS_SIGUSR2, function() {
    mongoose.connection.close().then(function() {
        console.log(process.env.SIGUSR2_MESSAGE);
        process.kill(process.pid, process.env.PROCESS_SIGUSR2);
    })
    .catch(function() {

    });
});