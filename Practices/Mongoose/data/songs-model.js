
const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        min : 6,
        max : 99
    }
});

const songSchema = mongoose.Schema({
    title : {
        type : String,
        required: true
    },
    duration : {
        type : Number,
        min : 1,
        max : 600
    },
    artists : [artistSchema],
    location : {
        type : [Number],
        index : "2dsphere"
    }
});

mongoose.model("Song", songSchema, "songs")