const { getDb } = require("../util/database");

class Hashtag {
    constructor(value) {
        this.value = value;
    }

    save() {
        const db = getDb();
        db.collection("hashtags").insertOne(this).then(
            (result) => {
                return result;
            }
        ).catch(
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

    static doesExist(val) {
        const db = getDb();
        return db.collection("hashtags").find({ value: val }).toArray().then(
            (data) => {
                if (data.length === 0) {
                    return false;
                }
                return true;
            }
        ).catch(
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

    static getAll() {
        const db = getDb();
        return db.collection("hashtags").find().toArray().then(
            (data) => {
                return data;
            }
        ).catch(
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }
};

module.exports = Hashtag;