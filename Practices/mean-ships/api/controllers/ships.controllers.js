const mongoose = require("mongoose");
const Ship = mongoose.model(process.env.SHIP_MODEL);

const getAll = function (req, res) {
    let latitude;
    let longitude;
    let distance;
    if (req.query && req.query.latitude) {
        latitude = parseFloat(req.query.latitude, 10);
    }
    if (req.query && req.query.longitude) {
        longitude = parseFloat(req.query.longitude, 10);
    }
    if (req.query && req.query.distance) {
        distance = parseFloat(req.query.distance, 10);
    }
    if (!isNaN(latitude) && !isNaN(longitude) && !isNaN(distance)) {
        _geoSearch(latitude, longitude, distance, res);
        return;
    }

    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({message:"QueryString offset & count should be numbers"});
        return;
    }
    const maxcount = 50;
    if (count > 50) {
        res.status(500).json({message:"Can not exceed of the count " + maxcount});
        return;
    }

    Ship.find().skip(offset*count).limit(count).exec(function (err, ships) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const _geoSearch = function(latitude, longitude, distance, res) {
    const point = {type:"Point", coordinates:[longitude, latitude]};
    const query = {
        "coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: distance,
                $minDistance: 0
            }
        }
    };

    Ship.find(query).exec(function(error, ships) {
        const response = {
            status: 200,
            message:ships
        }
        if (error) {
            response.status = 500;
            response.message = error;
        }
        console.log(response);
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const shipId = req.params.shipId;
    Ship.findById(shipId).exec(function (err, ship) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ship
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!ship) {
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