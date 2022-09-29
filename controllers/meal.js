const Log = require("../models/meal");
const { getDb } = require("../util/database");
const Hashtag = require("../models/hashtag");

exports.getMeals = (req, res, next) => {
    const db = getDb();
    Log.fetchAll().then(
        (logs) => res.send(JSON.stringify(logs))
    ).catch(
        err => {
            res.send("Some error occured while fetching logs.");
            console.log(err);
            throw err;
        }
    );
}

exports.postMeal = (req, res, next) => {
    const log = new Log(req.body.userId, req.body.hashtags, req.body.foodItems);
    log.save().then(result => {
        if (result.acknowledged) {
            req.body.hashtags.forEach((hashtag) => {
                Hashtag.doesExist(hashtag).then((exists) => {
                    if (!exists) {
                        const newHashTag = new Hashtag(hashtag);
                        newHashTag.save();
                    }
                });
            });
            res.send("Product added successfully");
            return;
        }
        else {
            res.send("Error adding product");
            return;
        }
    }).catch(err => {
        console.log(err);
        res.send("Error adding product");
    });
}