
const mongoose= require("mongoose");

const artistSchema= mongoose.Schema({
    name: {
        type: String,
        required: [true, process.env.NAME_IS_REQUIRED]
    },
    age: {
        type: Number,
        min: 6,
        max: 99,
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
        min: 1,
        max: 600,
        required: [true, process.env.DURATION_IS_REQUIRED]
    },
    artists: [artistSchema]
});

mongoose.model(process.env.DB_SONG_MODEL, songSchema, process.env.DB_SONGS_COLLECTION);