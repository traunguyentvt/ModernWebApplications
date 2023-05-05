const MongoClient = require("mongodb").MongoClient;

let _connection = null;

const open = function() {
    if (get() == null) {
        let mongoClient = new MongoClient(process.env.DB_URL, {useNewUrlParser : true})
        mongoClient.connect().then(function(client) {
            _connection = client.db(process.env.DB_NAME);
            console.log("DB Connection open", _connection);
        }).catch(function(err) {
            console.log("DB Connection failed", err);
            return;
        });
    }
}

const get = function() {
    return _connection;
}

module.exports = {
    open,
    get
}