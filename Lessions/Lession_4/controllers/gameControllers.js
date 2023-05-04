
const gameData = require("../data/games.json")

module.exports.getAll = function(req, res) {
    console.log("Get All received");

    let offset = 0;
    let count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }

    console.log("offset", offset);
    console.log("offset+count", offset+count);
    const pageGames = gameData.slice(offset, offset+count);

    res.status(200).json(pageGames);
}

module.exports.getGame = function(req, res) {
    const gameIndex = req.params.gameIndex;
    console.log("Get gameIndex =", gameIndex);
    res.status(200).json(gameData[gameIndex]);
}

module.exports.addOne = function(req, res) {
    console.log("POST received");
    console.log("req.body", req.body);
    gameData.push(req.body);
    res.status(200).json({message : "Add One"});
}

//MVC: model: data, view: route, controller: business