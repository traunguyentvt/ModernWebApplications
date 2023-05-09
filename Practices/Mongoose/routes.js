
const express = require("express");
const router = express.Router();

const songsController = require("./controllers/songs.controller");
const artistsController = require("./controllers/artists.controller");

router.route("/songs/:songId/artists/:artistId")
    .get(artistsController.artistsGet)
    .put(artistsController.artistsFullUpdate)
    .patch(artistsController.artistsPartialUpdate)
    .delete(artistsController.artistsDelete);

router.route("/songs/:songId/artists")
    .get(artistsController.artistsGetAll)
    .post(artistsController.artistsAdd);

router.route("/songs/:songId")
    .get(songsController.getOne)
    .put(songsController.fullUpdateOne)
    .patch(songsController.partialUpdateOne)
    .delete(songsController.deleteOne);

router.route("/songs")
    .get(songsController.getAll)
    .post(songsController.addOne);


module.exports = router;