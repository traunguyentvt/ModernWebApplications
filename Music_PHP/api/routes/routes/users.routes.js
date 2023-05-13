const express = require("express");
const router = express.Router();

const usersController = require("../../controllers/users.controller");

router.route(process.env.ROUTE_USERID)
    .get(usersController.getOne);

router.route(process.env.DASH)
    .post(usersController.registerOne);


module.exports = router;