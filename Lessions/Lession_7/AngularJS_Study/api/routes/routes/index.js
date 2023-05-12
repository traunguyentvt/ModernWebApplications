
const express = require("express");
const router = express.Router();

const gameRoutes= require("./games.routes");
const userRoutes= require("./users.routes");

router.use("/games", gameRoutes);
router.use("/users", userRoutes)

module.exports = router;