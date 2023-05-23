const mongoose= require("mongoose");

const theaterSchema= mongoose.Schema({
    theaterId: {
        type: Number,
        required: true
    },
    location: {
        address: {
            street1: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zipcode: {
                type: String,
                required: true
            },
        },
        geo: {
            type: {
                type: String,
                required: true
            },
            coordinates: {
                type: [Number],
                index: "2dsphere"
            }
        }
    }
    
});

mongoose.model(process.env.THEATER_MODEL, theaterSchema, process.env.DB_THEATER_COLLECTION)