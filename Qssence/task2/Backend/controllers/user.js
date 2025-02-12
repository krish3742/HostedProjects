const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const secretKey = process.env.SECRET_KEY;

module.exports.registerUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const checkUserExits = await User.findOne({ email });
    if (checkUserExits) {
      const resp = {
        status: "Conflict",
        message: "User already exists",
      };
      res.status(409).send(resp);
      return;
    }
    let password = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({ email, name, password });
    const resp = {
      status: "success",
      message: "User registered",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      const resp = {
        status: "Error",
        message: "No user exist",
      };
      res.status(401).send(resp);
      return;
    }
    const status = await bcrypt.compare(password, user.password);
    if (!status) {
      const resp = {
        status: "Error",
        message: "Password mismatch",
      };
      res.status(404).send(resp);
      return;
    }
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "10h",
    });
    const resp = {
      status: "Success",
      message: "Logged in",
      data: { token },
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};
