const express= require("express");
const router= express.Router();

const songController= require("../../controllers/songs.controller");

router.route(process.env.ROUTE_SONGID)
    .get(songController.getOne)
    .put(songController.fullUpdateOne)
    .patch(songController.partialUpdateOne)
    .delete(songController.deleteOne);

router.route(process.env.DASH)
    .get(songController.getAll)
    .post(songController.addOne);


module.exports = router;