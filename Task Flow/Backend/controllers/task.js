const Task = require("../models/task.js");

module.exports.viewAllTask = async (req, res, next) => {
  try {
    const result = await Task.find();
    const resp = {
      status: "Success",
      message: "All task fetched",
      data: result,
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports.createTask = async (req, res, next) => {
  try {
    const result = await Task.create(req.body);
    const resp = {
      status: "success",
      message: "Task created",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const { title } = req.body;
    if (!title) {
      const resp = {
        status: "Error",
        message: "All fields required",
      };
      res.status(403).send(resp);
      return;
    }
    const task = await Task.findByIdAndUpdate(taskId, { title });
    if (!task) {
      const resp = {
        status: "Error",
        message: "Task not found",
      };
      res.status(404).send(resp);
      return;
    }
    const resp = {
      status: "Success",
      message: "Task updated",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      const resp = {
        status: "Error",
        message: "Task not found",
      };
      res.status(404).send(resp);
      return;
    }
    const resp = {
      status: "Success",
      message: "Task deleted",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};
