const userTokens = require('../data/userToken.json');

exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = userTokens.find(user => user.token === token);

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = user;

  next();
}
