const Task = require("../models/task.model");

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, status } = req.body;

    // Validate required fields
    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    // Create task
    const task = await Task.create({
      title: title.trim(),
      status: status || "pending",
    });

    res.status(200).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Error creating task",
      error: error.message,
    });
  }
};

// @desc    Get all tasks with filtering and pagination
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    // filter object
    const filter = {};
    if (status && (status === "pending" || status === "completed")) {
      filter.status = status;
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // pagination parameters
    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid pagination parameters. Page must be >= 1 and limit must be between 1 and 100",
      });
    }

    // query with pagination
    const tasks = await Task.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Getting total count for pagination info
    const totalTasks = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalTasks / limitNum);

    res.status(200).json({
      success: true,
      count: tasks.length,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalTasks,
        limit: limitNum,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1,
      },
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching tasks",
      error: error.message,
    });
  }
};

// @desc    Update task status (mark as completed/pending)
// @route   PATCH /api/tasks/:id
// @access  Public
const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validating MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }

    // Validating status
    if (!status || (status !== "pending" && status !== "completed")) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'pending' or 'completed'",
      });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating task status",
      error: error.message,
    });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    // Validating MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID format",
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};
