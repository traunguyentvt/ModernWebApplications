const mongoose = require("mongoose");

const actionSchema = mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    nextStep: String,
    date: Date
});

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
        type: String
    },
    location: locationSchema,
    description: String,
    experience: String,
    skills: [String],
    postDate: {
        type : Date,
        default: Date.now()
    },
    actions: [actionSchema]
});

mongoose.model("Jobopening", jobopeningSchema, "jobopening")