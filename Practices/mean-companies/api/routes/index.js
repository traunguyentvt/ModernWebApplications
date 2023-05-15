const express= require("express");

const router= express.Router();
const companiesController= require("../controllers/companies.controllers");
const relationshipsController= require("../controllers/relationships.controllers");

router.route("/companies")
        .get(companiesController.getAll);

router.route("/companies/:companyId")
        .get(companiesController.getOne);

router.route("/companies/:companyId/relationships")
        .get(relationshipsController.getAll);

module.exports= router;