
//underscore: _function => private method

const mongoose = require("mongoose");
const Song = mongoose.model("Song");
const callbackify = require("util").callbackify;

const _runGeoQuery = function(req, res) {
    const lat = parseFloat(req.query.lat, 10);
    const lng = parseFloat(req.query.lng, 10);
    Song.finc({"publisher.location.coordinates":{
        $near : { $geometry : {
            "type" : "Point", "coordinates" : [lat, long]}, $maxDistance : 10000, $minDistance : 0}
    }});
} 

module.exports.getAll = function(req, res) {
    let offset = 0;
    let count = 100;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(500).json({message:"QueryString offset and limit should be numbes"});
        return;
    }
    if (count > 100) {
        res.status(500).json({message:"Cannot exceed count of " + 100});
        return;
    }

    if (req.query && req.query.lat && req.query.lng) {
        _runGeoQuery(req, res);
        return;
    }

    const findWithCallback = callbackify(function(offset, count) {
        return Song.find().skip(offset).limit(count).exec();
    });
    findWithCallback(offset, count, function(err, songs) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(songs);
        }
    });
};

module.exports.getOne = function(req, res) {
    const songId = req.params.songId;
    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).exec();
    });
    findWithCallback(songId, function(err, song) {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (!song) {
            res.status(500).json({message:"Song ID not found"});
        } else {
            res.status(200).json(song);
        }
    });
};

module.exports.addOne = function(req, res) {
    const newSong = {
        title : req.body.title,
        duration : req.body.duration,
        artists : req.body.artists
    };
    const addWithCallback = callbackify(function(newSong) {
        return Song.create(newSong);
    });
    addWithCallback(newSong, function(err, song) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(song);
        }
    });
};

module.exports.fullUpdateOne = function(req, res) {
    const songId = req.params.songId;
    const updatedSong = {
        title : req.body.title,
        duration : req.body.duration,
        artists : req.body.artists
    };
    const updateWithCallback = callbackify(function(updatedSong) {
        return Song.findByIdAndUpdate(songId, updatedSong);
    });
    updateWithCallback(songId, updatedSong, function(err, song) {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (!song) {
            res.status(500).json({message:"Song ID not found"});
        } else {
            res.status(200).json(song);
        }
    });
};

module.exports.partialUpdateOne = function(req, res) {
    const songId = req.params.songId;
    const updatedSong = {
        title : req.body.title,
        duration : req.body.duration,
        artists : req.body.artists
    };
    const updateWithCallback = callbackify(function(updatedSong) {
        return Song.findByIdAndUpdate(songId, updatedSong);
    });
    updateWithCallback(songId, updatedSong, function(err, song) {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (!song) {
            res.status(500).json({message:"Song ID not found"});
        } else {
            res.status(200).json(song);
        }
    });
}

module.exports.deleteOne = function(req, res) {
    const songId = req.params.songId;
    const deleteWithCallback = callbackify(function(songId) {
        return Song.findByIdAndDelete(songId).exec();
    });
    deleteWithCallback(songId, function(err, song) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(song);
        }
    })
};

