
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const addOne = function(req, res) {
    console.log(req.body);

    if (!req.body) {
        res.status(400).json({message:"Parameters are missing"});
        return;
    }
    //when we have too many promises (>= 3) => should use the combine Promises and Named Callback
    bcrypt.genSalt(10).then((saltHash) => {
        bcrypt.hash(req.body.password, saltHash).then((passwordHash) => {
            const newUser = {
                name: req.body.name,
                username: req.body.username,
                password: passwordHash
            }
            const response = {};
            User.create(newUser).then((user) => {
                // response.status = 201;
                // response.message = user;
                // res.status(201).json(user);
                //set response
                _setResponse(201, user, response);
            }).catch((error) => {
                // res.status(500).json(error);
                //set response
                _setResponse(201, error, response);
            }).finally(() => {
                //return response
                console.log(response);
                res.status(response.status).json(response.message);
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).json(error);
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json(error);
    });
}

const _setResponse = function(status, message, response) {
    response.status = status;
    response.message = message;
}

module.exports= {
    register: addOne
}