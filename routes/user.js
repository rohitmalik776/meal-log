const Express = require("express");

const userController = require("../controllers/user");

const router = Express.Router();

router.get("/get-user-meals", userController.getUserMeals);

router.use("/", (req, res, next) => {
    res.redirect("/404");
});

module.exports = router;