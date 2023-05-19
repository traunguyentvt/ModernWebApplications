const express= require("express");
const router= express.Router();

const usersController= require("../../controllers/users.controller");

router.route(process.env.DASH)
    .post(usersController.register);

router.route(process.env.ROUTE_LOGIN)
    .post(usersController.login);


module.exports = router;