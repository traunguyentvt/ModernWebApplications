const express = require("express");
const router = express.Router();
const gameController = require("./controllers/gameControllers");

// router.route("/games").get(function(req, res) {
//     res.status(200).json({message : "JSON Data!"});
// });

//order: specific first/above general
//no return all: dos (denial of service = return all data, many request at the same time => security), slow performance

router.route("/games/:gameIndex")
    .get(gameController.getGame);

router.route("/games")
    .get(gameController.getAll)
    .post(gameController.addOne);

router.route("/hello").get(function(req, res) {
    res.status(200).send("Hello World!");
});

module.exports = router;