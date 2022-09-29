const FoodItem = require("../models/fooditem");

exports.getIngredients = (req, res, next) => {
    let foodItem = req.query.foodItem;

    if (!foodItem) {
        res.send("Please provide foodItem query parameter in request");
        return;
    }

    foodItem = foodItem.charAt(0).toUpperCase() + foodItem.slice(1);

    FoodItem.getFoodItemByName(foodItem).then(
        (items) => {
            if (items.length == 0) {
                res.send(JSON.stringify([]));
                return;
            }
            res.send(JSON.stringify(items[0].ingredients));
        }
    ).catch(
        (err) => {
            console.log(err);
            throw err;
        }
    );
};