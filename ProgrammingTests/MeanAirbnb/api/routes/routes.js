const express = require("express");
const router = express.Router();

const airbnbController = require("../controllers/Airbnbs.controller");

router.route("/airbnbs/:airbnbId")
    .get(airbnbController.getOne)
    .put(airbnbController.fullUpdateOne)
    .patch(airbnbController.partialUpdateOne)
    .delete(airbnbController.deleteOne);

router.route("/airbnbs")
    .get(airbnbController.getAll)
    .post(airbnbController.addOne);

module.exports = router;