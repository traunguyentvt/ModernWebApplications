const express = require("express");
const router = express.Router();
const jobopeningController = require("../controllers/jobopening.controller");


router.route("/jobopenings/:jobopeningId/actions")
    .post(jobopeningController.addActionOne);

router.route("/jobopenings/:jobopeningId")
    .get(jobopeningController.getOne)
    .put(jobopeningController.fullUpdateOne)
    .delete(jobopeningController.deleteOne);

router.route("/jobopenings")
    .get(jobopeningController.getAll)
    .post(jobopeningController.addOne);

module.exports = router;