const express= require("express");
const router= express.Router();

const artistController= require("../../controllers/artists.controller");

router.route(process.env.ROUTE_SONGID_ARTISTS_ARTISTID)
    .get(artistController.artirstsGetOne)
    .put(artistController.artirstsFullUpdateOne)
    .patch(artistController.artirstsPartialUpdateOne)
    .delete(artistController.artirstsDeleteOne);

router.route(process.env.ROUTE_SONGID_ARTISTS)
    .get(artistController.artirstsGetAll)
    .post(artistController.artirstsAddOne);


module.exports = router;