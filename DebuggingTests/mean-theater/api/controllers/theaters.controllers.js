const mongoose = require("mongoose");
const Theater = mongoose.model(process.env.THEATER_MODEL);

const geoSearch= function(req, res) {
    let lng = parseFloat(req.query.lng, 10);
    let lat = parseFloat(req.query.lat, 10);

    let distance= parseFloat(process.env.GEO_SEARCH_MAX_DIST, 10);
    if (req.query && req.query.dist) {
        distance= parseFloat(req.query.dist, 10);
    }

    // Geo JSON Point
    const point= {type:"Point", coordinates:[lng, lat]};
    const query= {
        "location.geo.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: distance,
                $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10),
            }
        }
    };

    Theater.find(query).exec()
    .then((theaters) => {
        res.status(200).json(theaters);
    }).catch((error) => {
        res.status(500).json(error);
    }).finally(() => {
    });
}

const getAll= function (req, res) {
    if (req.query && req.query.lat && req.query.lng) {
        return geoSearch(req, res);
    }

    Theater.find().exec(function (err, theaters) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: theaters
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne= function (req, res) {
    const theaterId = req.params.theaterId;
    const response = {
        status: parseInt(process.env.REST_API_OK, 10),
        message: null
    };
    Theater.findById(theaterId).exec(function (err, theater) {
        // console.log(theater);
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!theater) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        } else {
            response.message= theater;
        }
        // console.log(response);
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};