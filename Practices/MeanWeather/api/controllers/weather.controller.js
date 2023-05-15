
const mongoose = require("mongoose");
const Weather = mongoose.model("Weather");


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
        res.status(500).json({message:"Querystring offset & count should be numbers"});
        return;
    }
    const maxCount = 100;
    if (count > maxCount) {
        res.status(500).json({message:"Cannot exceed of the count " + maxCount});
        return;
    }

    Weather.find().skip(offset*count).limit(count).exec().then(function(weatherList) {
        res.status(200).json(weatherList);
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.getOne = function(req, res) {
    let weatherId;
    if (req.params && req.params.weatherId) {
        weatherId = req.params.weatherId;
    }
    if (!weatherId) {
        res.status(500).json({message:"Missing weather ID"});
        return;
    }
    Weather.findById(weatherId).exec().then(function(weather) {
        if (!weather) {
            res.status(404).json({message:"Can not find with this weather ID"});
        } else {
            res.status(500).json(weather);
        }
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.addOne = function(req, res) {

}

module.exports.fullUpdateOne = function(req, res) {

}

module.exports.deleteOne = function(req, res) {
    let weatherId;
    if (req.params && req.params.weatherId) {
        weatherId = req.params.weatherId;
    }
    if (!weatherId) {
        res.status(500).json({message:"Missing weather ID"});
        return;
    }
    Weather.findByIdAndDelete(weatherId).exec().then(function(weather) {
        if (!weather) {
            res.status(404).json({message:"Can not find with this weather ID"});
        } else {
            res.status(200).json(weather);
        }
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

