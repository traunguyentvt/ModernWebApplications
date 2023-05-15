
const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
    tripDuration: {
        type: Number,
        required: true
    },
    startStationId: Number,
    startStationName: String,
    endStationId: Number,
    endStationName: String,
    bikeId: Number,
    userType: String,
    birthYear: Number,
    gender: Number,
    
});