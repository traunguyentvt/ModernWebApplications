
const express = require("express");
const router = express.Router();
const tripsController = require("../controllers/trips.controller");

router.route("/trips")
    .get(tripsController.getAll)
    .post(tripsController.addOne);

router.route("/trips/:tripId")
    .get(tripsController.getOne)
    .put(tripsController.fullUpdateOne)
    .delete(tripsController.deleteOne);

module.exports = router;