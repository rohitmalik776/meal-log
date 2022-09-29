const Express = require("express");
const bodyParser = require("body-parser");

const { mongoConnect } = require("./util/database");

require("dotenv").config();

const mealsRouter = require("./routes/meal");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const errorController = require("./controllers/error");

const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/meals", mealsRouter);
app.use("/user", userRouter);
app.use("/hashtag", hashtagRouter);

app.get("/", (req, res, next) => {
    res.send("App is working fine.");
});

app.use("/404", errorController.get404);
app.use(errorController.get404);

mongoConnect(() => {
    console.log("Connected to DB");
    app.listen(4000);
});