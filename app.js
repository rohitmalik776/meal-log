const Express = require("express");
const bodyParser = require("body-parser");

const { mongoConnect } = require("./util/database");

// Import environment variables from .env file.
require("dotenv").config();

// Import routers.
const mealsRouter = require("./routes/meal");
const userRouter = require("./routes/user");
const hashtagRouter = require("./routes/hashtag");
const foodItemRouter = require("./routes/fooditem");
const authRouter = require("./routes/auth");

// Import error controller for 404 route.
const errorController = require("./controllers/error");

// Import middlewares.
const authMiddleware = require("./middleware/is-auth");

// Make an instance of Express application.
const app = Express();

// Middlewares for handling body parsing of incoming requests.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routing v1 apis.
// Authenticated routes.
app.use("/api/v1/meals", authMiddleware, mealsRouter);
app.use("/api/v1/user", authMiddleware, userRouter);
app.use("/api/v1/hashtag", authMiddleware, hashtagRouter);
app.use("/api/v1/foodItem", authMiddleware, foodItemRouter);

// Un authenticated routes.
app.use("/api/v1/auth", authRouter);

// Index
app.get("/", (req, res, next) => {
    res.send("App is working fine.");
});

// 404 not found handler, needed for redirection from other routes.
app.use("/404", errorController.get404);
// Default handler, if no other route matches.
app.use(errorController.get404);

// Connect to MongoDB database.
mongoConnect().then(
    (_) => app.listen(4000, (err) => {
        if (err) {
            throw err;
        }
        console.log(`Listening on ${4000}`);
    })
);