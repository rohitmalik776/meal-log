const Express = require("express");

const foodItemController = require("../controllers/fooditem");

const router = Express.Router();

router.get("/get-ingredients", foodItemController.getIngredients);

router.use("/", (req, res, next) => {
    res.redirect("/404");
});

module.exports = router;