
require("dotenv").config();
const gameData = require("../data/games.json");

module.exports.getAll = function(req, res) {
    console.log("GET All received");
    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    console.log("offset =", offset, "count = ", count, "offset+count", offset+count);

    const pageGames = gameData.slice(offset, offset+count);

    res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(pageGames);
};

module.exports.getGame = function(req, res) {
    const gameIndex = parseInt(req.params.gameIndex);
    console.log("gameIndex =", gameIndex);
    const size = gameData.length;
    if (size == 0 || gameIndex < 0 || gameIndex >= size) {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({message : process.env.MESSAGE_CANNOT_FOUND_ITEM_INDEX});
    } else {
        res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json(gameData[gameIndex]);
    }
};

module.exports.addGame = function(req, res) {
    console.log("POST received");
    console.log("req.body = ", req.body);
    gameData.push(req.body);
    res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({message : process.env.MESSAGE_ADD_GAME_SUCCESSFULLY});
};
