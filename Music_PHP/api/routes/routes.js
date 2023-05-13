
const express = require("express");
const router = express.Router();

const songController = require("../controllers/songs.controller");
const artistController = require("../controllers/artists.controller");

router.route(process.env.ROUTE_SONGS_SONGID)
    .get(songController.getOne)
    .put(songController.fullUpdateOne)
    .patch(songController.partialUpdateOne)
    .delete(songController.deleteOne);

router.route(process.env.ROUTE_SONGS)
    .get(songController.getAll)
    .post(songController.addOne);

router.route(process.env.ROUTE_SONGS_SONGID_ARTISTS_ARTISTID)
    .get(artistController.artirstsGetOne)
    .put(artistController.artirstsFullUpdateOne)
    .patch(artistController.artirstsPartialUpdateOne)
    .delete(artistController.artirstsDeleteOne);

router.route(process.env.ROUTE_SONGS_SONGID_ARTISTS)
    .get(artistController.artirstsGetAll)
    .post(artistController.artirstsAddOne);


module.exports = router;