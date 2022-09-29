const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

exports.signup = async (req, res, next) => {
  // Validate user email and password  
  const email = req.body.email;
  const password = req.body.password;
  const errors = [];


  if (!email || email.isEmpty || !validateEmail(email)) {
    errors.push("Invalid email");
  }

  if (errors.length == 0) {
    const doesExist = await User.doesExist(email);
    if (doesExist) {
      errors.push("Email already exists");
    }
  }

  if (!password || password.isEmpty || password.length < 8) {
    errors.push("Invalid password");
  }

  if (errors.length != 0) {
    const error = "Validation failed.";
    error.statusCode = 422;
    error.data = errors;
    res.send({
      msg: "Error occured while creating user",
      errors: errors,
    });
    return;
  }

  bcrypt
    .hash(password, 12)
    .then(hashedPw => {
      const user = new User(email, hashedPw);
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;

  User.getUser(email)
    .then(user => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(err.statusCode).send(JSON.stringify({ msg: "Something went wrong" }));
    });
};
