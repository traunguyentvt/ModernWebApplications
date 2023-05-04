
require("dotenv").config();

module.exports.multiplyNumber = function(req, res) {
    console.log("GET multiplying received");
    let number1 = parseInt(req.params.number1);
    let number = 0;
    if (req.query && req.query.number) {
        number = parseInt(req.query.number);
    }
    res.status(parseInt(process.env.HTTP_RESPONSE_OK)).json({"result" : number1*number});
};