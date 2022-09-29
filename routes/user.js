const Express = require("express");

const router = Express.Router();

router.use("/", (req, res, next) => {
    res.redirect("/404");
});

module.exports = router;