const express= require("express");
const router= express.Router();

const songController= require("../../controllers/songs.controller");
const authenticationController= require("../../controllers/authentication.controller");

router.route(process.env.ROUTE_SONGID)
    .get(songController.getOne)
    .put(authenticationController.authenticate, songController.fullUpdateOne)
    .patch(authenticationController.authenticate, songController.partialUpdateOne)
    .delete(authenticationController.authenticate, songController.deleteOne);

router.route(process.env.SLASH)
    .get(songController.getAll)
    .post(authenticationController.authenticate, songController.addOne);


module.exports= router;