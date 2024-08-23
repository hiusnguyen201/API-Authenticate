import { ValidationError } from "express-validation";
import httpStatus from "http-status";
import ApiErrorUtils from "#src/utils/ApiErrorUtils.js";

export default {
  handler,
  notFound,
  converter,
};

/**
 * Converts errors to ApiErrorUtils
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _
 */
function converter(err, req, res, _) {
  let convertedErr = err;

  if (err instanceof ValidationError) {
    convertedErr = new ApiErrorUtils({
      message: "Validation Error",
      errors: err.errors,
      status: err.status || httpStatus.BAD_REQUEST,
      stack: err.stack,
    });
  } else if (!(err instanceof ApiErrorUtils)) {
    convertedErr = new ApiErrorUtils({
      message: err.message,
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  }

  handler(convertedErr, req, res);
}

/**
 * Handle 404 error
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 */
function notFound(req, res) {
  const err = new ApiErrorUtils({
    message: "Not found",
    status: httpStatus.NOT_FOUND,
  });
  handler(err, req, res);
}

/**
 * Handle errors
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _
 */
function handler(err, req, res, _) {
  const response = {
    code: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    ip: req.ipv4,
    url: req.originalUrl,
  };

  if (req.app.get("env") === "production") {
    delete response.stack;
  } else {
    console.log(response);
  }

  res.set("Content-Type", "application/json");
  res.status(response.code).json(response);
  return res.end();
}
