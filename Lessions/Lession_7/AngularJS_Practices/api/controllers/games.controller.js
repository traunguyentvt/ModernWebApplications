
const mongoose = require("mongoose");
const callbackify = require("util").callbackify;
const Game = mongoose.model("Game");

module.exports.getAll = function(req, res) {
    let offset = 0;
    let count = 500;
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

    // const lng = parseFloat(req.query.lng);
    // const lat = parseFloat(req.query.lat);
    //Geo JSON Point
    
    
    const findWithCallback = callbackify(function() {
        return Game.find().skip(offset).limit(count).exec();
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
    const gameId = req.params.gameId;
    const findWithCallback = callbackify(function(gameId) {
        return Game.findById(gameId).exec();
    });
    findWithCallback(gameId, function(err, game) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(game);
        }
    });
}

module.exports.addOne = function(req, res) {
    const newGame = {title: "req.title", rate: req.rate, year: req.year, minPlayers: req.minPlayers, maxPlayers: req.maxPlayers, minAge: req.minAge};
    const addWithCallback = callbackify(function(newGame) {
        return Game.create(newGame);
    });
    addWithCallback(newGame, function(err, game) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(game);
        }
    });
}

module.exports.deleteOne = function(req, res) {
    const gameId = req.params.gameId;
    const deleteWithCallback = callbackify(function(gameId) {
        return Game.findByIdAndDelete(gameId).exec();
    });
    deleteWithCallback(gameId, function(err, game) {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(game);
        }
    });
}

module.exports.fullUpdateOne = function(req, res) {

}

module.exports.partialUpdateOne = function(req, res) {
    
}