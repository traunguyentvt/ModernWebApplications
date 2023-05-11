
const mongoose = require("mongoose");
const callbackify = require("util").callbackify;
const Game = mongoose.model("Game");

module.exports.getAll = function(req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({message : "QueryString offset and limit should be numbers"});
        return;
    }

    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    //Geo JSON Point
    const point = {type:"Point", coordinates:[lat, lng]};
    const query = {
        "publisher.location.coordinates" : {
            $near : {
                $geometry: point,
                $maxDistance: 10000000,
                $minDistance: 0
            }
        }
    };
    
    const findWithCallback = callbackify(function() {
        return Game.find(query).exec();
        // return Game.aggregate([
        //     {
        //         "$geoNear" : {
        //             "near" : point,
        //             "spherical" : true,
        //             "distanceField" : "distance",
        //             "maxDistance" : 1000000,
        //             "minDistance" : 
        //         }
        //     },
        //     {
        //         "#limit" : 10000
        //     }
        // ]);
    });
    findWithCallback(function(err, games) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(games);
        }
    });
}

module.exports.getOne = function(req, res) {

}

module.exports.addOne = function(req, res) {

}

module.exports.deleteOne = function(req, res) {

}

module.exports.fullUpdateOne = function(req, res) {

}

module.exports.partialUpdateOne = function(req, res) {
    
}