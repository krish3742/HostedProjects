const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const resp = {
        status: "Error",
        message: "Access denied. No token provided.",
      };
      res.status(401).send(resp);
      return;
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, secretKey);
    if (!decodedToken) {
      const resp = {
        status: "Error",
        message: "Access denied. No token provided.",
      };
      res.status(401).send(resp);
      return;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    next(error);
  }
};
