const Task = require("../models/task.model");
const { BadRequestError, NotFoundError } = require("../utils/appError");

/* Create a new task */
const createTaskService = async ({ title, status }) => {
  try {
    if (!title || title.trim() === "") {
      throw new BadRequestError("Task title is required");
    }

    return await Task.create({
      title: title.trim(),
      status: status || "pending",
    });
  } catch (error) {
    throw error;
  }
};

/* Get tasks with filtering & pagination */
const getTasksService = async ({ status, page = 1, limit = 10 }) => {
  try {
    const filter = {};

    if (status && ["pending", "completed"].includes(status)) {
      filter.status = status;
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);

    if (pageNum < 1 || limitNum < 1 || limitNum > 100) {
      throw new BadRequestError(
        "Invalid pagination parameters. Page must be >= 1 and limit must be between 1 and 100",
      );
    }

    const skip = (pageNum - 1) * limitNum;

    const tasks = await Task.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limitNum)
      .lean();

    const totalTasks = await Task.countDocuments(filter);

    return {
      tasks,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(totalTasks / limitNum),
        totalTasks,
        limit: limitNum,
        hasNextPage: pageNum * limitNum < totalTasks,
        hasPrevPage: pageNum > 1,
      },
    };
  } catch (error) {
    throw error;
  }
};

/* Update task status */
const updateTaskStatusService = async (id, status) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError("Invalid task ID format");
    }

    if (!["pending", "completed"].includes(status)) {
      throw new BadRequestError(
        "Status must be either 'pending' or 'completed'",
      );
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  } catch (error) {
    throw error;
  }
};

/* Delete task */
const deleteTaskService = async (id) => {
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestError("Invalid task ID format");
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    return task;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTaskService,
  getTasksService,
  updateTaskStatusService,
  deleteTaskService,
};
