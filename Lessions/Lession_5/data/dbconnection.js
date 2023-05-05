const MongoClient = require("mongodb").MongoClient;
// const { MongoClient } = require("mongodb");

const { callbackify } = require("util");

let _connection = null;

const open = function() {
    if (get() == null) {
        const url = process.env.DB_URL;

        //approach 1
        // const mongoConnectWithCallback = callbackify(function(url) {
        //     return MongoClient.connect(url);
        // });

        //approach 2 => approach 1 = approach 2
        const myConnect = function(url) {
            return MongoClient.connect(url);
        }
        const mongoConnectWithCallback = callbackify(myConnect);
        mongoConnectWithCallback(url, function(err, client) {
            if (err) {
                console.log("DB Connection failed", err);
                return;
            } else {
                _connection = client.db(process.env.DB_NAME);
                // console.log("DB Connection open", _connection);
            }
        });

        //New way to connect to MongoDB
        // let mongoClient = new MongoClient(url, {useNewUrlParser : true})
        // mongoClient.connect().then(function(client) {
        //     _connection = client.db(process.env.DB_NAME);
        //     console.log("DB Connection open", _connection);
        // }).catch(function(err) {
        //     console.log("DB Connection failed", err);
        //     return;
        // });
    }
}

const get = function() {
    return _connection;
}

module.exports = {
    open,
    get
}