const { Timestamp } = require("mongodb");
const { getDb } = require("../util/database")

class Meal {
    constructor(userId, hashtags, foodItems) {
        this.userId = userId;
        this.hashtags = hashtags;
        this.foodItems = foodItems;
        this.timeStamp = new Date().toISOString();
    };

    save() {
        const db = getDb();
        return db.collection("logs").insertOne(this).then(
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

    static fetchAll() {
        const db = getDb();
        return db.collection("logs").find().toArray().then(
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

    static fetchWithId(id) {
        const db = getDb();
        return db.collection("logs").find({ userId: id }).toArray().then(data => {
            return data;
        }).catch(err => {
            console.log(err);
            throw err;
        })
    }
};

module.exports = Meal;