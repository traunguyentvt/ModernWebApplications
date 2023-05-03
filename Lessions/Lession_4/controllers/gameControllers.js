
module.exports.getAll = function(req, res) {
    console.log("Get All received");
    res.status(200).json({"JSON Data" : "GET"});
}