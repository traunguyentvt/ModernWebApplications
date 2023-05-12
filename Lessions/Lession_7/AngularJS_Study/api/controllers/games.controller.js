
const mongoose = require("mongoose");
const callbackify = require("util").callbackify;
const Game = mongoose.model("Game");

module.exports.getAll = function(req, res) {
    let offset = 0;
    let count = 5;
    let keySearch;
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
    // const point = {type:"Point", coordinates:[lng, lat]};
    // const query = {
    //     "publisher.location.coordinates" : {
    //         $near : {
    //             $geometry: point,
    //             $maxDistance: 10000000,
    //             $minDistance: 0
    //         }
    //     }
    // };
    
    if (req.query && req.query.keySearch) {
        // keySearch = req.query.keySearch.toLowerCase();
        keySearch = req.query.keySearch;
    }
    let query = {};
    if (keySearch) {
        query = {
            title: {$regex:keySearch}
        };
    }
    
    const findWithCallback = callbackify(function(query) {
        console.log(query);
        return Game.find(query).skip(offset*count).limit(count).exec();

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
    findWithCallback(query, function(err, games) {
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
    const newGame = {title: req.body.title, rate: req.body.rate, year: req.body.year, minPlayers: req.body.minPlayers, maxPlayers: req.body.maxPlayers, minAge: req.body.minAge, price: req.body.price};
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
    const fullUpdate = function(req, res, game, response) {
        game.title = req.body.title;
        game.rate = req.body.rate;
        game.year = req.body.year;
        game.minPlayers = req.body.minPlayers;
        game.maxPlayers = req.body.maxPlayers;
        game.minAge = req.body.minAge;
        game.price = req.body.price;

        _saveGame(res, game, response);
    };
    _updateOne(req, res, fullUpdate);
}

module.exports.partialUpdateOne = function(req, res) {
    const partialUpdate = function(req, res, game, response) {
        if (req.body.title) {
            game.title = req.body.title;
        }
        if (req.body.rate) {
            game.rate = parseInt(req.body.rate);
        }
        if (req.body.year) {
            game.year = parseInt(req.body.year);
        }
        if (req.body.minPlayers) {
            game.minPlayers = parseInt(req.body.minPlayers);
        }
        if (req.body.maxPlayers) {
            game.maxPlayers = parseInt(req.body.maxPlayers);
        }
        if (req.body.minAge) {
            game.minAge = parseInt(req.body.minAge);
        }
        if (req.body.price) {
            game.price = parseFloat(req.body.price);
        }

        _saveGame(res, game, response);
    };
    _updateOne(req, res, partialUpdate);
}

const _updateOne = function(req, res, updateCallback) {
    const gameId = req.params.gameId;
    if (!gameId) {
        res.status(400).json({ message : "Game ID not found"});
        return;
    }
    if (!req.body) {
        res.status(400).json({ message : "Parameters are missing"});
        return;
    }
    console.log(gameId, req.body);
    const findWithCallback = callbackify(function(gameId) {
        return Game.findById(gameId).exec();
    });
    findWithCallback(gameId, function(err, game) {
        const response = {status: 200, message : game};
        if (err) {
            _setInternalResponse(response, err, 500);
        } else if (!game) {
            _setInternalResponse(response, { message : "Game Not Found"}, 404);
        }
        if (200 != response.status) {
            _sendResponse(response, res);
            return;
        }
        updateCallback(req, res, game, response);
    });
}

const _saveGame = function(res, game, response) {
    console.log(game);
    const saveWithCallback = callbackify(function(game) {
        return game.save();
    });
    saveWithCallback(game, function(err, updatedGame) {
        if (err) {
            _setInternalResponse(response, err, 500);
        } else {
            _setInternalResponse(response, updatedGame, 200);
        }
        console.log(response);
        _sendResponse(response, res);
    });
}

const _setInternalResponse = function(response, data, code) {
    response.status = code;
    response.message = data;
}

const _sendResponse = function(response, res) {
    res.status(response.status).json(response.message);
}