
const mongoose = require("mongoose");
const bCrypt = require("bcrypt");

const User = mongoose.model(process.env.DB_USER_MODEL);


const getOne= function(req, res) {
    
}

const addOne= function(req, res) {
    if (!req.body) {
        res.status(parseInt(process.env.HTTP_RESPONSE_400)).json({ message : process.env.PARAMETERS_ARE_MISSING});
        return;
    }

    bCrypt.genSalt(10).then((saltHash) => {
        bCrypt.hash(req.body.password, saltHash).then((passwordHash) => {
            const newUser = {
                name : req.body.name,
                username : req.body.username,
                password : passwordHash
            };
            User.create(newUser).then((user) => {
                res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(user);
            }).catch((error) => {
                res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(error);
            });
        }).catch((error) => {
            res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(error);
        });
    }).catch((error) => {
        res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json(error);
    });
}

module.exports = {
    getOne: getOne,
    registerOne: addOne
}