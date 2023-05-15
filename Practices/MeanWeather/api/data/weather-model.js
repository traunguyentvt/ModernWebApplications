
const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
    st: String,
    ts: String,
    position: {
        // type: String,
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    },
    airTemperature: Number,
    dewPoint: Number,
    pressure: Number,
    wind: {
        direction: Number,
        speed: Number
    },
    visibility: Number,
    precipitationEstimatedObservation: Number
});

mongoose.model("Weather", weatherSchema, "data");