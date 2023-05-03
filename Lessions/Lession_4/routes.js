const express = require("express");
const router = express.Router();
const gameController = require("./controllers/gameControllers");

// router.route("/games").get(function(req, res) {
//     res.status(200).json({message : "JSON Data!"});
// });

router.route("/games").get(gameController.getAll);

router.route("/hello").get(function(req, res) {
    res.status(200).send("Hello World!");
});

module.exports = router;