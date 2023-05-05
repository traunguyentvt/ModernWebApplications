
require("dotenv").config();
// const gameData = require("../data/games.json");

const dbConnection = require("../data/dbconnection");

module.exports.getAll = function(req, res) {
    console.log("GET All received");

    const db = dbConnection.get();
    // console.log("DB connection", db);

    let offset = 0;
    let count = 3;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
        if (count > 8) {
            count = 8;
        }
    }
    console.log("offset =", offset, "count = ", count, "offset+count", offset+count);

    const gameCollection = db.collection(process.env.GAMES_COLLECTION);
    gameCollection.find({}).skip(offset).limit(count).toArray().then(function(games) {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(games);
    });
};

module.exports.getGame = function(req, res) {
    const gameId = req.params.gameId;
    console.log("gameId =", gameId);

    const ObjectId = require("mongodb").ObjectId;
    const gameObject = new ObjectId(gameId);
    console.log("gameObject =", gameObject);

    const db = dbConnection.get();
    const gameCollection = db.collection(process.env.GAMES_COLLECTION);
    gameCollection.findOne({"_id" : gameObject}).then(function(game) {
        console.log("Found game", game);
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(game);
    });
};

module.exports.addGame = function(req, res) {
    console.log("POST received");
    console.log("req.body = ", req.body);
    let newGame = {};
    if (req.body && req.body.title && req.body.price && req.body.minPlayers && req.body.minAge) {
        newGame.title = req.body.title;
        newGame.price = parseFloat(req.body.price);
        newGame.minPlayers = parseInt(req.body.minPlayers);
        newGame.minAge = parseInt(req.body.minAge);
    }

    if (newGame.minPlayers >= 1 && newGame.minPlayers <= 11 && newGame.minAge >= 6 && newGame.minAge <= 99) {
        const db = dbConnection.get();
        const gamesCollection = db.collection(process.env.GAMES_COLLECTION);

        gamesCollection.insertOne(newGame).then(function(response) {
            console.log(response);
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(response);
        });
    } else {
        res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json({error : process.env.MESSAGE_MISSING_PARAMETERS});
    }
};

module.exports.removeGame = function(req, res) {
    if (req.body && req.body.gameId) {
        const gameId = req.body.gameId;
        console.log("gameId =", gameId);

        const ObjectId = require("mongodb").ObjectId;
        const gameObject = new ObjectId(gameId);
        console.log("gameObject =", gameObject);

        const db = dbConnection.get();
        const gameCollection = db.collection(process.env.GAMES_COLLECTION);

        gameCollection.deleteOne({"_id" : gameObject}).then(function(game) {
            console.log("Delete game", game);
            res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({message : process.env.MESSAGE_DELETE_SUCCESSFULLY});
        });
    } else {
        res.status(parseInt(process.env.HTTP_RESPONSE_ERROR)).json({error : process.env.MESSAGE_MISSING_PARAMETERS});
    }
};
