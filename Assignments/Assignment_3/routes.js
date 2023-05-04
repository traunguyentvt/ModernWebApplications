
const express = require("express");
const router = express.Router();
const gamesController = require("./controllers/games.controller");
const utilitiesController = require("./controllers/utilities.controller");
const studentsController = require("./controllers/students.controller");

router.route("/games/:gameIndex")
    .get(gamesController.getGame);

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addGame);

router.route("/multiply/:number1")
    .get(utilitiesController.multiplyNumber);

router.route("/students/:studentIndex")
    .get(studentsController.getStudent);

router.route("/students")
    .get(studentsController.getAll);

module.exports = router;