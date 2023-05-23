
const express= require("express");
const router= express.Router();

const songRoutes= require("./songs.routes");
const userRoutes= require("./users.routes");
const artistRoutes= require("./artists.routes");

router.use(process.env.ROUTE_SONGS, songRoutes);
router.use(process.env.ROUTE_USERS, userRoutes);
router.use(process.env.ROUTE_SONGS, artistRoutes);


module.exports = router;