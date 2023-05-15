const mongoose = require("mongoose");
const Company = mongoose.model(process.env.COMPANY_MODEL);

const getAll = function (req, res) {
    const companyId = req.params.companyId;
    Company.findById(companyId).select("relationships").exec(function (err, company) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: company.relationships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const companyId = req.params.companyId;
    Company.findById(companyId).select("relationships").exec(function (err, company) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: company
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!company) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        console.log("message", response.message);
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};