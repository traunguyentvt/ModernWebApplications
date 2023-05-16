const mongoose= require("mongoose");

const movieSchema= mongoose.Schema({
    plot: String,
    genres: [ String ],
    runtime: Number,
    cast: [ String ],
    title: String,
    fullplot: String,
    languages: [ String ],
    released: Date,
    directors: [ String ],
    writers: [ String ],
    awards: { 
        wins: Number, 
        nominations: Number, 
        text: String 
    },
    year: Number,
    imdb: { 
        rating: Number, 
        votes: Number, 
        id: Number 
    },
    countries: [ String ],
    type: String,
    rated: String,
    genres: [String],
    directors: [String]
});

mongoose.model(process.env.MOVIE_MODEL, movieSchema, process.env.DB_MOVIES_COLLECTION);