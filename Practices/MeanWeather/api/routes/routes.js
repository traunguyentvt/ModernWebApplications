
const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weather.controller");

router.route("/weather")
    .get(weatherController.getAll)
    .post(weatherController.addOne);

router.route("/weather/:weatherId")
    .get(weatherController.getOne)
    .put(weatherController.fullUpdateOne)
    .delete(weatherController.deleteOne);

module.exports = router;