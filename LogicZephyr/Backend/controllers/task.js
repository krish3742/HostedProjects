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
    const { title, description } = req.body;
    if (!title || !description) {
      const resp = {
        status: "Error",
        message: "All fields required",
      };
      res.status(404).send(resp);
      return;
    }
    const task = await Task.findByIdAndUpdate(taskId, { title, description });
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

module.exports.completeTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userInput = req.body.completed;
    if (userInput !== true && userInput !== false) {
      const resp = {
        status: "Error",
        message: "Invalid value",
      };
      res.status(422).send(resp);
      return;
    }
    const task = await Task.findByIdAndUpdate(taskId, {
      completed: userInput,
    });
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
