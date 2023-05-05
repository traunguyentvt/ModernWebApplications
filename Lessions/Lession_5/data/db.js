
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, {useNewURLParser : true, useUnifiedTopology : true});

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected " + process.env.DB_NAME);
});

// mongoose.connection.on("disconnected", function() {
//     console.log("Mongoose disconnected");
// });

mongoose.connection.on("error", function(err) {
    console.log("Mongoose connected err", err);
});

process.on("SIGINT", function() {
    mongoose.disconnect(function() {
        console.log("Mongoose close");
        process.exit(0);
    });

    // mongoose.connection.close(function() {
    //     console.log("Mongoose close");
    //     process.exit(0);
    // });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose restart");
        process.kill(process.pid, "SIGUSR2");
    });
});