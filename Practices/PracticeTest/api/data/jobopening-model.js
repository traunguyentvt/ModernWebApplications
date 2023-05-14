const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const jobopeningSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    salary: {
        type: Number
    },
    location: locationSchema,
    description: String,
    experience: String,
    skills: [String],
    postDate: Date
});

mongoose.model("Jobopening", jobopeningSchema, "jobopening")