const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [1, "Task title cannot be empty"],
      maxlength: [200, "Task title cannot exceed 200 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "completed"],
        message: "{VALUE} is not a valid status, Use 'pending' or 'completed'",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

// Index for query performance on status field
taskSchema.index({ status: 1 });
taskSchema.index({ createdAt: -1 });

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
