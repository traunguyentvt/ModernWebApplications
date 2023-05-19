
const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    username: {
        type: String,
        required: [true, process.env.USERNAME_IS_REQUIRED],
        unique: true
    },
    name: {
        type: String,
        required: [true, process.env.NAME_IS_REQUIRED]
    },
    password: {
        type: String,
        required: [true, process.env.PASSWORD_IS_REQUIRED]
    }
});

mongoose.model(process.env.DB_USER_MODEL, userSchema, process.env.DB_USERS_COLLECTION);