
const dbConnection = require("../data/dbConnection");
const ObjectId = require("mongodb").ObjectId;
const callbackify = require("util").callbackify;

module.exports.getAll = function(req, res) {
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    const db = dbConnection.get();
    const gameCollection = db.collection(process.env.GAMES_COLLECTION);

    const findWithCallback = callbackify(function(offset, count) {
        return gameCollection.find({}).skip(offset).limit(count).toArray();
    });

    findWithCallback(offset, count, function(err, games) {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(games);
    });
}

module.exports.getGame = function(req, res) {
    let gameId = req.params.gameId;
    const db = dbConnection.get();
    const gameCollection = db.collection(process.env.GAMES_COLLECTION);

    console.log("gameId = " + gameId);

    const findWithCallback = callbackify(function(gameId) {
        return gameCollection.findOne({"_id" : new ObjectId(gameId)});
    });

    findWithCallback(gameId, function(err, game) {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(game);
    });
}

module.exports.addOne = function(req, res) {
    let newGame = {};
    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price, 10);
        newGame.minPlayers = parseFloat(req.body.minPlayers, 10);
        newGame.minAge = parseFloat(req.body.minAge, 10);
    }
    const db = dbConnection.get();
    const gameCollection = db.collection(process.env.GAMES_COLLECTION);

    console.log("newGame =", newGame);

    const addWithCallback = callbackify(function(newGame) {
        return gameCollection.insertOne(newGame);
    });

    addWithCallback(newGame, function(err, response) {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(response);
    });
}

module.exports.updateGame = function(req, res) {
    let gameId = req.params.gameId;
    let newValues = {};
    if (req.body && req.body.title && req.body.price) {
        newValues.title = req.body.title;
        newValues.price = parseFloat(req.body.price, 10);
    }
    console.log("gameId = " + gameId);
    console.log("newValues = ", newValues);

    const db = dbConnection.get();
    const gameCollection = db.collection(process.env.GAMES_COLLECTION);
    const updateWithCallback = callbackify(function(gameId, newValues) {
        return gameCollection.updateOne({"_id" : new ObjectId(gameId)}, {$set : newValues});
    });
    updateWithCallback(gameId, newValues, function(err, response) {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(response);
    });
}

module.exports.removeGame = function(req, res) {
    let gameId = req.params.gameId;
    console.log("gameId = " + gameId);
    const db = dbConnection.get();
    const gameCollection = db.collection(process.env.GAMES_COLLECTION);
    const removeWithCallback = callbackify(function(gameId) {
        return gameCollection.deleteOne({"_id" : new ObjectId(gameId)});
    });
    removeWithCallback(gameId, function(err, response) {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(response);
    });
}