const Hashtag = require("../models/hashtag");

exports.getHashtags = (req, res, next) => {
    Hashtag.getAll().then(
        (hashtags) => {
            res.send(JSON.stringify(hashtags));
            return;
        }
    ).catch(
        (err) => {
            console.log(err);
            throw err;
        }
    );
};