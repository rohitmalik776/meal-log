const Meal = require("../models/meal");

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