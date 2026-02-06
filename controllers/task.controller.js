const {
  createTaskService,
  getTasksService,
  updateTaskStatusService,
  deleteTaskService,
} = require("../services/task.service");

// POST - create Task
const createTask = async (req, res, next) => {
  try {
    const task = await createTaskService(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// GET - Listing the tasks
const getTasks = async (req, res, next) => {
  try {
    const result = await getTasksService(req.query);
    res.status(200).json({
      success: true,
      count: result.tasks.length,
      pagination: result.pagination,
      data: result.tasks,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH - Update the status
const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await updateTaskStatusService(req.params.id, req.body.status);
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

// DELETE - Delete the task
const deleteTask = async (req, res, next) => {
  try {
    await deleteTaskService(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
