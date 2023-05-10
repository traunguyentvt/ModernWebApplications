
const express = require("express");
const router = express.Router();

const gameController = require("./controllers/games.controller");

router.route("/games/:gameId")
    .get(gameController.getOne)
    .delete(gameController.deleteOne)
    .put(gameController.fullUpdateOne)
    .patch(gameController.partialUpdateOne);

router.route("/games")
    .get(gameController.getAll)
    .post(gameController.addOne);

module.exports = router;