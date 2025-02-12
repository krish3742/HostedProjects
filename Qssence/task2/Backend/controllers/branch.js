const Branch = require("../models/branch.js");

module.exports.viewAllBranch = async (req, res, next) => {
  try {
    const userId = req.userId;
    const result = await Branch.find({ createdBy: userId });
    const resp = {
      status: "Success",
      message: "All branch fetched",
      data: result,
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports.createBranch = async (req, res, next) => {
  try {
    const createdBy = req.userId;
    const { name, location } = req.body;
    if (!name || !location || !req.file) {
      const resp = {
        status: "Error",
        message: "All fields required",
      };
      res.status(404).send(resp);
      return;
    }
    const logo = req.file.path;
    const result = await Branch.create({ name, location, logo, createdBy });
    const resp = {
      status: "success",
      message: "Branch created",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports.updateBranch = async (req, res, next) => {
  try {
    const userId = req.userId;
    const branchId = req.params.id;
    const { name, location } = req.body;
    if (!name || !location) {
      const resp = {
        status: "Error",
        message: "All fields required",
      };
      res.status(404).send(resp);
      return;
    }
    const check = await Branch.findById(branchId);
    if (!check) {
      const resp = {
        status: "Error",
        message: "Branch not found",
      };
      res.status(404).send(resp);
      return;
    }
    if (check.createdBy.toString() !== userId) {
      const resp = {
        status: "Error",
        message: "You are not authorized",
      };
      res.status(403).send(resp);
      return;
    }
    let logo = check.logo;
    if (req.file) {
      logo = req.file.path;
    }
    const branch = await Branch.findByIdAndUpdate(branchId, {
      name,
      location,
      logo,
    });
    const resp = {
      status: "Success",
      message: "Branch updated",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteBranch = async (req, res, next) => {
  try {
    const userId = req.userId;
    const branchId = req.params.id;
    const check = await Branch.findById(branchId);
    if (check.createdBy.toString() !== userId) {
      const resp = {
        status: "Error",
        message: "You are not authorized",
      };
      res.status(403).send(resp);
      return;
    }
    const branch = await Branch.findByIdAndDelete(branchId);
    if (!branch) {
      const resp = {
        status: "Error",
        message: "Branch not found",
      };
      res.status(404).send(resp);
      return;
    }
    const resp = {
      status: "Success",
      message: "Branch deleted",
    };
    res.send(resp);
  } catch (error) {
    next(error);
  }
};
