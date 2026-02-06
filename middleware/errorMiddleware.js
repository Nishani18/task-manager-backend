const { NotFoundError } = require("../utils/appError");

const notFound = (req, res, next) => {
  next(new NotFoundError(`Route not found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = { notFound, errorHandler };
