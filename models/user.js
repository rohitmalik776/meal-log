const { getDb } = require("../util/database");

/** A class representing users. */
class User {
  /**
   * 
   * @param {string} email 
   * @param {string} password 
   */
  constructor(email, password) {
    this.email = email;
    this.password = password;
  }

  /**
   * Saves the user to backend.
   * @returns Transaction result from database.
   */
  async save() {
    const db = getDb();
    return db.collection("users").insertOne(this).then(
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
   * Fetches the data of a given user from backend.
   * @param {string} email 
   * @returns 
   */
  static async getUser(email) {
    const db = getDb();
    return db.collection("users").find({ email: email }).toArray().then(
      (data) => {
        if (data.length == 0) {
          return null;
        }
        return data[0];
      }
    ).catch(
      (err) => {
        console.log(err);
        throw err;
      }
    );
  }

  static async doesExist(email) {
    const user = await this.getUser(email);
    if (!user) {
      return false;
    }
    return true;
  }

};

module.exports = User;
