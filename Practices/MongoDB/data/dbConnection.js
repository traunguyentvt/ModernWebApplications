
const MongoClient = require("mongodb").MongoClient;
const callbackify = require("util").callbackify;

let _connection = null;

const open = function() {
    if (get() == null) {
        const url = process.env.DB_URL;
        const connectWithCallback = callbackify(function(url) {
            return MongoClient.connect(url);
        });
        connectWithCallback(url, function(err, client) {
            if (err) {
                console.log("DB Connection fialed", err);
                return;
            } else {
                console.log("DB Connection succeeded");
                _connection = client.db(process.env.DB_NAME);
            }
        });
    }
};

const get = function() {
    return _connection;
};

module.exports = {
    get,
    open
};