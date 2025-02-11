const express = require("express");

const branchController = require("../controllers/branch.js");
const { isAuthenticated } = require("../middlewares/isAuth.js");

const router = express.Router();

router.get("/getAllBranches", isAuthenticated, branchController.viewAllBranch);
router.post("/createBranch", isAuthenticated, branchController.createBranch);
router.put("/updateBranch/:id", isAuthenticated, branchController.updateBranch);
router.delete(
  "/deleteBranch/:id",
  isAuthenticated,
  branchController.deleteBranch
);

module.exports = router;
