const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res.status(401).send("Not authenticated");
    return;
  }

  const token = authHeader.split(' ')[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    res.status(500).send("Something went wrong");
    throw err;
  }
  if (!decodedToken) {
    res.status(401).send("Not authenticated");
    return;
  }

  req.userId = decodedToken.userId;
  next();
};
