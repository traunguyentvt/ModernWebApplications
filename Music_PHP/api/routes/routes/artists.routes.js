const express= require("express");
const router= express.Router();

const artistController= require("../../controllers/artists.controller");
const authenticationController= require("../../controllers/authentication.controller");

router.route(process.env.ROUTE_SONGID_ARTISTS_ARTISTID)
    .get(artistController.artirstsGetOne)
    .put(authenticationController.authenticate, artistController.artirstsFullUpdateOne)
    .patch(authenticationController.authenticate, artistController.artirstsPartialUpdateOne)
    .delete(authenticationController.authenticate, artistController.artirstsDeleteOne);

router.route(process.env.ROUTE_SONGID_ARTISTS)
    .get(artistController.artirstsGetAll)
    .post(authenticationController.authenticate, artistController.artirstsAddOne);


module.exports= router;