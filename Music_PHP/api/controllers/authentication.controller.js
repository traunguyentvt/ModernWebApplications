
const jwt = require("jsonwebtoken");
const util = require("util");

const helpers= require("../helpers");

module.exports.authenticate = function(req, res, next) {
    const response= helpers.createRespone();
    const headerExists = req.headers.authorization;
    
    if (headerExists) {
        const token = headerExists.split(process.env.SPACE_STRING)[(parseInt(process.env.DEFAULT_SPLIT_AUTHENTICATION_INDEX, 10))];
        const jwtVerifyPromise= util.promisify(jwt.verify);
        jwtVerifyPromise(token, process.env.TOKEN_SECRETE)
        .then(() => {
            next();
        }).catch((error) => {
            helpers.setDataToForbiddenRequest(response, error);
            helpers.sendResponse(res, response);
        });
    } else {
        helpers.setMessageToUnauthorizedRequest(response, process.env.NO_TOKEN_PROVIDED);
        helpers.sendResponse(res, response);
    }
}