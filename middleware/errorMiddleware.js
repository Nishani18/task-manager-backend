const { NotFoundError } = require("../utils/appError");

const notFound = (req, res, next) => {
  next(new NotFoundError(`Route not found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose CastError (Invalid ID) if it wasn't caught in service
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid task ID format";
  }

  // For 500 errors in production, hide the original message
  if (statusCode === 500) {
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message,
    // ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
