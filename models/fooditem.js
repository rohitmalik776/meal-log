const { getDb } = require("../util/database");

/** * A class representing a food item.*/
class FoodItem {
    constructor() {
        this.name;
        this.ingredients;
    }

    /**
     * Queries database for a food item matching with given item name.
     * @param {string} itemName 
     * @returns {Promise} Promise, resolving to an array of all the items matching given item name.
     */
    static async getFoodItemByName(itemName) {
        const db = getDb();
        return db.collection("foodItems").find({ name: itemName }).toArray().then(
            (items) => {
                return items;
            }
        ).catch(
            (err) => {
                console.log(err);
                throw err;
            }
        );
    }

    /**
     * Queries database for a given itemName.
     * @param {string} itemName 
     * @returns Promise resolving to a true if product exists, else false.
     */
    static async doesExist(itemName) {
        return this.getFoodItemByName(itemName).then(
            (items) => {
                if (items.length == 0) {
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
};

module.exports = FoodItem;