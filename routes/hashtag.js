const Express = require("express");

const hashtagController = require("../controllers/hashtag");

const router = Express.Router();

router.get("/get-hashtags", hashtagController.getHashtags);

router.use("/", (req, res, next) => {
    res.redirect("/404");
});

module.exports = router;