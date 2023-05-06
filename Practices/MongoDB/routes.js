
const express = require("express");
const router = express.Router();

const gameController = require("./controllers/games.controller");

router.route("/games/:gameId")
    .get(gameController.getGame)
    .delete(gameController.removeGame)
    .put(gameController.updateGame);

router.route("/games")
    .get(gameController.getAll)
    .post(gameController.addOne);


module.exports = router;