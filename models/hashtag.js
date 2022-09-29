const { getDb } = require("../util/database");

/** Class representing a Hashtag.
 * 
 * This class serves as a wrapper around MongoDb, exporting
 * methods for querying and adding new Hashtags easily.
 */
class Hashtag {
    /**
     * 
     * @param {string} value - The name of the hashtag.
     */
    constructor(value) {
        this.value = value;
    }

    /**
     * Saves the newly created Hashtag to database.
     * @returns {Promise} A result of transaction on MongoDB database.
     */
    async save() {
        const db = getDb();
        return db.collection("hashtags").insertOne(this).then(
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

    /**
     * Queries the database for existing hashtag.
     * @param {string} val 
     * @returns {Promise} A result of transaction on MongoDB database.
     */
    static async doesExist(val) {
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

    /**
     * Queries the database for all hashtags.
     * @returns {Promise} A promise resulting to all the hashtags stored on the backend.
     */
    static async getAll() {
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