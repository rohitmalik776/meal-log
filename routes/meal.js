const Express = require("express");

const router = Express.Router();
const mealControllers = require("../controllers/meal");

router.get("/get-meals", mealControllers.getMeals);
router.post("/post-meal", mealControllers.postMeal);

router.use("/", (req, res, next) => {
    res.redirect("/404");
});

module.exports = router;