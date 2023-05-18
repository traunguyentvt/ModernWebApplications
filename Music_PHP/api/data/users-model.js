
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
});

mongoose.model(process.env.DB_USER_MODEL, userSchema, process.env.DB_USERS_COLLECTION);