
const mongoose = require("mongoose");
const bCrypt = require("bcrypt");

const User = mongoose.model(process.env.DB_USER_MODEL);

const getOne= function(req, res) {
    
}

const addOne= function(req, res) {
    if (!req.body) {
        _sendResponse(res, parseInt(process.env.HTTP_RESPONSE_400, 10), {message:process.env.PARAMETERS_ARE_MISSING});
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
                if (!user) {
                    _sendResponse(res, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10), {message:process.env.USER_NOT_FOUND});
                } else {
                    _sendResponse(res, parseInt(process.env.HTTP_RESPONSE_OK, 10), user);
                }
            }).catch((error) => {
                _sendResponse(res, parseInt(process.env.HTTP_RESPONSE_ERROR, 10), error);
            });
        }).catch((error) => {
            _sendResponse(res, parseInt(process.env.HTTP_RESPONSE_ERROR, 10), error);
        });
    }).catch((error) => {
        _sendResponse(res, parseInt(process.env.HTTP_RESPONSE_ERROR, 10), error);
    });
}

const _sendResponse = function(res, status, response) {
    res.status(status).json(response);
}

module.exports = {
    getOne,
    registerOne: addOne
}