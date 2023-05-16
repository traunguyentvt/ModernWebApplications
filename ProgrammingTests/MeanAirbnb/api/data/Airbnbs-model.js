
const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    street: String,
    suburn: String,
    market: String,
    country: String,
    country_code: String,
    location: {
        coordinates : {
            type: [Number],
            index: "2dsphere"
        }
    }
})

const airbnbSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: addressSchema,
    house_rules: String,
    property_type: String,
    cleaning_fee: Number
});

mongoose.model(process.env.DB_MODEL_NAME, airbnbSchema, process.env.DB_COLLECTION_NAME);