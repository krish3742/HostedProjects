const express = require("express");

const upload = require("../middlewares/multer.js");
const branchController = require("../controllers/branch.js");
const { isAuthenticated } = require("../middlewares/isAuth.js");

const router = express.Router();

router.get("/getAllBranches", isAuthenticated, branchController.viewAllBranch);
router.post(
  "/createBranch",
  isAuthenticated,
  upload.single("logo"),
  branchController.createBranch
);
router.put(
  "/updateBranch/:id",
  isAuthenticated,
  upload.single("logo"),
  branchController.updateBranch
);
router.delete(
  "/deleteBranch/:id",
  isAuthenticated,
  branchController.deleteBranch
);

module.exports = router;
