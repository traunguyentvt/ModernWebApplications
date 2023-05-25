
const mongoose= require("mongoose");

const artistSchema= mongoose.Schema({
    name: {
        type: String,
        required: [true, process.env.NAME_IS_REQUIRED]
    },
    age: {
        type: Number,
        min: parseInt(process.env.DEFAULT_MIN_AGE, 10),
        max: parseInt(process.env.DEFAULT_MAX_AGE, 10),
        required: [true, process.env.AGE_IS_REQUIRED]
    }
});

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, process.env.TITLE_IS_REQUIRED]
    },
    duration: {
        type: Number,
        min: parseInt(process.env.DEFAULT_MIN_DURATION, 10),
        max: parseInt(process.env.DEFAULT_MAX_DURATION, 10),
        required: [true, process.env.DURATION_IS_REQUIRED]
    },
    artists: [artistSchema]
});

mongoose.model(process.env.DB_SONG_MODEL, songSchema, process.env.DB_SONGS_COLLECTION);