const express= require("express");
const router= express.Router();

const userController= require("../../controllers/users.controller");

router.route(process.env.SLASH)
    .post(userController.register);

router.route(process.env.ROUTE_LOGIN)
    .post(userController.login);


module.exports= router;