
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

mongoose.model(process.env.DB_USER_MODEL, userSchema, process.env.DB_USERS_COLLECTION);