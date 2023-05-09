
const mongoose = require("mongoose");
const Song = mongoose.model("Song");
const callbackify = require("util").callbackify;

module.exports.artistsGetAll = function(req, res) {
    const songId = req.params.songId;
    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).select("artists").exec();
    });
    findWithCallback(songId, function(err, song) {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (!song) {
            res.status(500).json({message:"Song ID not found"});
        } else {
            res.status(200).json(song.artists);
        }
    });
};

module.exports.artistsGet = function(req, res) {
    const songId = req.params.songId;
    const findWithCallback = callbackify(function(songId) {
        return Song.findById(songId).select("artists").exec();
    });
    findWithCallback(songId, function(err, song) {
        if (err) {
            res.status(500).json(err);
            return;
        } else if (!song) {
            res.status(500).json({message:"Song ID not found"});
        } else {
            const artistId = req.params.artistId;
            const artist = song.artists.id(artistId);
            if (!artist) {
                res.status(500).json({message:"Artist ID not found"});
            } else {
                res.status(200).json(song.artists);
            }
        }
    });
};

module.exports.artistsAdd = function(req, res) {
    //check body if empty
    
};

module.exports.artistsFullUpdate = function(req, res) {

};

module.exports.artistsPartialUpdate = function(req, res) {

}

module.exports.artistsDelete = function(req, res) {

};