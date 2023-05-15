const mongoose = require("mongoose");
const Company = mongoose.model(process.env.COMPANY_MODEL);

const getAll = function (req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({message:"Querystring offset & count should be numbers"});
        return;
    }
    let maxCount = 5;
    if (count > maxCount) {
        res.status(500).json({message:"Can not exceed of the count " + maxCount});
        return;
    }
    const sort_query = {};
    if (req.query && req.query.isSorted) {
        if(1 == parseInt(req.query.isSorted, 10)) {
            sort_query.name = 1;
        }
    }
    let query = {};
    if (req.query && req.query.keySearch) {
        query = {
            "relationships.person.first_name" : {$regex:req.query.keySearch}
        };
    }

    Company.find(query).sort(sort_query).skip(offset*count).limit(count).exec(function (err, companies) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: companies
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
    Company.findById(companyId).exec(function (err, company) {
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
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};