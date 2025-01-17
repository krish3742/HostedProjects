const express = require("express");

const taskController = require("../controllers/task.js");

const router = express.Router();

router.get("/", taskController.viewAllTask);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.patch("/:id/complete", taskController.completeTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
