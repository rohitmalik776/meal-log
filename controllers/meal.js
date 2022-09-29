const Meal = require("../models/meal");
const { getDb } = require("../util/database");
const Hashtag = require("../models/hashtag");
const FoodItem = require("../models/fooditem");

exports.getMeals = (req, res, next) => {
    const db = getDb();
    Meal.fetchAll().then(
        (logs) => res.send(JSON.stringify(logs))
    ).catch(
        err => {
            res.send("Some error occured while fetching logs.");
            console.log(err);
            throw err;
        }
    );
}

exports.getUserMeals = (req, res, next) => {
    const id = req.query.userId;
    if (!id) {
        res.send("Please provide userId as a query parameter.");
        return;
    }
    Meal.fetchWithId(id).then(
        (logs) => {
            res.send(JSON.stringify(logs));
        }
    ).catch(
        (err) => {
            console.log(err);
            res.send("Could not find meals");
            throw err;
        }
    );
};

exports.postMeal = async (req, res, next) => {
    const log = new Meal(req.userId, req.body.hashtags, req.body.foodItems);

    var allMealsExist = true;

    for (let i = 0; i < req.body.foodItems.length; i++) {
        let currentItem = req.body.foodItems[i];
        currentItem = currentItem.charAt(0).toUpperCase() + currentItem.slice(1);

        await FoodItem.doesExist(currentItem).then(
            (result) => {
                if (!result) {
                    allMealsExist = false;
                }
            }
        ).catch((err) => {
            console.log(err);
            throw err;
        });
    }

    if (!allMealsExist) {
        res.send("Please provide the meals that exist in the database.");
        return;
    }

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