
const express = require("express");
const router = express.Router();

const songController = require("./controllers/songs.controller");
const artistController = require("./controllers/artists.controller");

router.route(process.env.ROUTE_SONGS_SONGID)
    .get(songController.getOne)
    .put(songController.fullUpdateOne)
    .patch(songController.partialUpdateOne)
    .delete(songController.deleteOne);

router.route(process.env.ROUTE_SONGS)
    .get(songController.getAll)
    .post(songController.addOne);

router.route(process.env.ROUTE_SONGS_SONGID_ARTISTS_ARTIST_ID)
    .get(artistController.artirstsGet)
    .put(artistController.artirstsUpdate)
    .delete(artistController.artirstsDelete);

router.route(process.env.ROUTE_SONGS_SONGID_ARTISTS)
    .get(artistController.artirstsGetAll)
    .post(artistController.artirstsAdd);


module.exports = router;