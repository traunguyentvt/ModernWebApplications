
const mongoose= require("mongoose");

const artistSchema= mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 6,
        max: 99
    }
});

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        min: 1,
        max: 600
    },
    artists: [artistSchema]
});

mongoose.model(process.env.DB_SONG_MODEL, songSchema, process.env.DB_SONGS_COLLECTION);