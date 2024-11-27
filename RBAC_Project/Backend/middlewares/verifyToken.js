import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      const resp = {
        status: "error",
        message: "Unauthorized: No token found",
      };
      res.status(401).send(resp);
      return;
    }
    const secretKey = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.id);
    if (!user) {
      const resp = {
        status: "error",
        message: "No user found",
      };
      res.status(401).send(resp);
      return;
    }
    if (user.role !== "Admin") {
      const resp = {
        status: "error",
        message: "Unauthorized: User not admin",
      };
      res.status(403).send(resp);
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export { isAdmin };
