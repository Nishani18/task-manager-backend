const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/task.controller");

// Main routes
router
  .route("/")
  .get(getTasks) // GET /api/tasks - List all tasks with filtering & pagination
  .post(createTask); // POST /api/tasks - Create a new task

router
  .route("/:id")
  .patch(updateTaskStatus) // PATCH /api/tasks/:id - Update task status
  .delete(deleteTask); // DELETE /api/tasks/:id - Delete task

module.exports = router;
