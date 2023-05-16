
const mongoose = require("mongoose");
const Airbnb = mongoose.model(process.env.DB_MODEL_NAME);

module.exports.getAll = function(req, res) {
    let offset = 0;
    let count = 20;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({message:"QueryString offset and count should be numbers"});
        return;
    }
    const maxCount = 100;
    if (count > maxCount) {
        res.status(500).json({message:"Cannot exceed of the count " + maxCount});
        return;
    }

    Airbnb.find().skip(offset).limit(count).exec().then(function(airbnbs) {
        res.status(200).json(airbnbs);
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.getOne = function(req, res) {
    let airbnbId;
    if (req.params && req.params.airbnbId) {
        airbnbId = req.params.airbnbId;
    }
    if (!airbnbId) {
        res.status(500).json({message:"There is missing airbnbId"});
        return;
    }
    Airbnb.findById(airbnbId).exec().then(function(airbnb) {
        if (!airbnb) {
            res.status(404).json({message:"Cannot find Airbnb with this airbnbId"});
        } else {
            res.status(200).json(airbnb);
        }
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.deleteOne = function(req, res) {
    let airbnbId;
    if (req.params && req.params.airbnbId) {
        airbnbId = req.params.airbnbId;
    }
    if (!airbnbId) {
        res.status(500).json({message:"There is missing airbnbId"});
        return;
    }
    Airbnb.findByIdAndDelete(airbnbId).exec().then(function(airbnb) {
        if (!airbnb) {
            res.status(404).json({mesage:"Cannot find Airbnb with this airbnbId"});
        } else {
            res.status(200).json(airbnb);
        }
    }).catch(function(error) {
        res.status(500).json(error);
    });
}

module.exports.addOne = function(req, res) {

}

module.exports.fullUpdateOne = function(req, res) {

}

module.exports.partialUpdateOne = function(req, res) {

}