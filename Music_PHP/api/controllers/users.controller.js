
const jwt= require("jsonwebtoken");
const mongoose= require("mongoose");
const bCrypt= require("bcrypt");
const util= require("util");

const User= mongoose.model(process.env.DB_USER_MODEL);
const helpers= require("../helpers");

const _getOne= function(req, res) {
    const response= helpers.createRespone();
    if (!req.body || !req.body.username || !req.body.password) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    User.findOne({[process.env.VARIABLE_USERNAME]: req.body.username})
        .then((user) => _checkUserExists(response, user))
        .then((user) => _checkPassword(req.body.password, user))
        .then(({user, isPasswordMatch}) => _handlePasswordMatch(response, user, isPasswordMatch))
        .then((user) => _generateToken(user))
        .then((token) => helpers.setDataToRequestSuccess(response, {[process.env.VARIABLE_TOKEN]: token}))
        .catch((error) => helpers.setDataResponse(response, error))
        .finally(() => helpers.sendResponse(res, response));
}

const _addOne= function(req, res) {
    const response= helpers.createRespone();

    if (!req.body || !req.body.name || !req.body.username || !req.body.password) {
        helpers.setMessageToBadRequest(response, process.env.PARAMETERS_ARE_MISSING);
        helpers.sendResponse(res, response);
        return;
    }

    //called: separate concern
    const saltRound= parseInt(process.env.DEFAULT_SALT_ROUND, 10);
    bCrypt.genSalt(saltRound)
          .then((salt) => _generateHash(req.body.password, salt))
          .then((passwordHash) => _createUser(req, passwordHash))
          .then((savedUser) => helpers.setDataToCreatedSuccess(response, savedUser))
          .catch((error) => helpers.setDataToInternalError(response, error))
          .finally(() => helpers.sendResponse(res, response));
}

const _generateToken= function(user) {
    const sign= util.promisify(jwt.sign);
    return sign({[process.env.VARIABLE_NAME]: user.name}, process.env.TOKEN_SECRETE, {[process.env.VARIABLE_EXPIRES_IN]: parseInt(process.env.DEFAULT_EXPIRES_IN, 10)});
}

const _checkUserExists= function(response, user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            helpers.setStatusResponse(response, parseInt(process.env.HTTP_RESPONSE_NOT_FOUND, 10));
            reject({[process.env.VARIABLE_MESSAGE]: process.env.USER_NOT_FOUND});
        } else {
            resolve(user);
        }
    });
}

const _checkPassword= function(password, user) {
    return new Promise((resolve, reject) => {
        bCrypt.compare(password, user.password)
            .then((isPasswordMatch) => resolve({user, isPasswordMatch}))
            .catch((error) => reject(error));
    });
}

const _handlePasswordMatch= function(response, user, isPasswordMatch) {
    return new Promise((resolve, reject) => {
        if (isPasswordMatch) {
            resolve(user);
        } else {
            helpers.setStatusResponse(response, parseInt(process.env.HTTP_RESPONSE_UNAUTHORIZED, 10));
            reject({[process.env.VARIABLE_MESSAGE]: process.env.PASSWORD_NOT_MATCH});
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


module.exports= {
    login: _getOne,
    register: _addOne
}