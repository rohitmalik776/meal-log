const MongoDb = require("mongodb");

const MongoClient = MongoDb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
    return MongoClient.connect(process.env.MONGODBURI).then(
        (client) => {
            _db = client.db();
            return client;
        }
    ).catch(
        err => {
            console.log(err);
            throw err;
        }
    );
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "Not connected to DB.";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;