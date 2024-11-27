import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkUserExits = await User.findOne({ email });
    if (!checkUserExits) {
      const resp = {
        status: "error",
        message: "User doesn't exists",
      };
      res.status(404).send(resp);
      return;
    }
    const checkPassword = await bcrypt.compare(
      password,
      checkUserExits.password
    );
    if (!checkPassword) {
      const resp = {
        status: "error",
        message: "Invalid credentials",
      };
      res.status(404).send(resp);
      return;
    }
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ id: checkUserExits._id }, secretKey);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 360000,
    });
    const resp = {
      status: "success",
      message: "Login successfully",
      data: {
        id: checkUserExits._id,
        name: checkUserExits.name,
        email: checkUserExits.email,
        role: checkUserExits.role,
        token,
      },
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkUserExits = await User.findOne({ email });
    if (checkUserExits) {
      const resp = {
        status: "conflict",
        message: "User already exists",
      };
      res.status(409).send(resp);
      return;
    }
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const user = new User({
      name: req.body.name,
      email,
      password: hashPassword,
      role: req.body.role,
    });
    const result = await user.save();
    const resp = {
      status: "success",
      message: "User registered",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");
    const resp = {
      status: "success",
      message: "Logout successfully",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
});

export default router;
