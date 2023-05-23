const express= require("express");

const router= express.Router();
const theatersController= require("../controllers/theaters.controllers");

router.route("/theaters")
        .get(theatersController.getAll);

router.route("/theaters/:theaterId")
        .get(theatersController.getOne);

module.exports = router;