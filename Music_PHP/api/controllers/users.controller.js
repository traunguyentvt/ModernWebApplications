
const mongoose= require("mongoose");
const bCrypt= require("bcrypt");
const User= mongoose.model(process.env.DB_USER_MODEL);
const helpers = require("../helpers");

const _getOne= function(req, res) {
    const response = helpers.createRespone();
    if (!req.body || !req.body.username || !req.body.password) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    User.findOne({username:req.body.username})
        .then((user) => _checkUserExists(response, user))
        .then((user) => _checkPassword(req.body.password, user.password))
        .then((isPasswordMatch) => _handlePasswordMatch(response, isPasswordMatch))
        .then((data) => helpers.setMessageToRequestSuccess(response, data))
        .catch((error) => helpers.setErrorMessage(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

const _addOne= function(req, res) {
    const response = helpers.createRespone();

    if (!req.body || !req.body.name || !req.body.username || !req.body.password) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    //called: separate concern
    const saltRound = parseInt(process.env.DEFAULT_SALT_ROUND, 10);
    bCrypt.genSalt(saltRound)
          .then((salt) => _generateHash(req.body.password, salt))
          .then((passwordHash) => _createUser(req, passwordHash))
          .then((savedUser) => helpers.setMessageToCreatedSuccess(response, savedUser))
          .catch((error) => helpers.setMessageToInternalError(response, error))
          .finally(() => helpers.sendResponse(res, response));
}

const _checkUserExists = function(response, user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            _setStatusResponse(response, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10));
            reject({message:process.env.USER_NOT_FOUND});
        } else {
            resolve(user);
        }
    });
}

const _checkPassword = function(password, encryptedPassword) {
    return bCrypt.compare(password, encryptedPassword);
}

const _handlePasswordMatch = function(response, isPasswordMatch) {
    console.log(isPasswordMatch);
    return new Promise((resolve, reject) => {
        if (isPasswordMatch) {
            resolve({message:process.env.LOGIN_SUCCESSFULLY});
        } else {
            _setStatusResponse(response, parseInt(process.env.HTTP_RESPONSE_UNAUTHORIZED, 10));
            reject({message:process.env.PASSWORD_NOT_MATCH});
        }
    });
}

const _generateHash= function(password, salt) {
    return bCrypt.hash(password, salt);
}

const _createUser= function(req, passwordHash) {
    const newUser= {
        name: req.body.name,
        username: req.body.username,
        password: passwordHash
    };
    return User.create(newUser);
}


module.exports = {
    login: _getOne,
    register: _addOne
}