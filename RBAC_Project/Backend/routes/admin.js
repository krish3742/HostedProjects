import express from "express";
import { isAdmin } from "../middlewares/verifyToken.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/getuser", isAdmin, async (req, res, next) => {
  try {
    const user = await User.find();
    const resp = {
      status: "success",
      message: "Data fetched",
      data: user,
    };
    res.send(resp);
    return;
  } catch (error) {
    next(error);
  }
});

router.post("/updateuser", isAdmin, async (req, res, next) => {
  try {
    const userId = req.body.id;
    if (userId === req.user._id.toString()) {
      const resp = {
        status: "error",
        message: "You can not modify yourself",
      };
      res.status(409).send(resp);
      return;
    }
    const user = await User.findByIdAndUpdate(userId, { role: req.body.role });
    if (!user) {
      const resp = {
        status: "error",
        message: "User not found",
      };
      res.status(404).send(resp);
      return;
    }
    const resp = {
      status: "success",
      message: "User updated",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
});

router.post("/deleteuser/:id", isAdmin, async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (userId === req.user._id.toString()) {
      const resp = {
        status: "error",
        message: "You can not delete yourself",
      };
      res.status(409).send(resp);
      return;
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      const resp = {
        status: "error",
        message: "User not found",
      };
      res.status(404).send(resp);
      return;
    }
    const resp = {
      status: "success",
      message: "User deleted",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
});

export default router;
