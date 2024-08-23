import httpStatus from "http-status";

class ResponseUtils {
  /**
   * Send response in JSON format
   * @param {*} res - Express response object
   * @param {*} statusCode - HTTP status code
   * @param {*} message - Message to be sent
   * @param {*} data - Data to be sent
   */
  static sendJson(res, statusCode, message, data = null, extras = {}) {
    const responseData = {
      success:
        statusCode >= httpStatus.OK &&
        statusCode < httpStatus.MULTIPLE_CHOICES, // 200-299 Success response
      message,
    };

    if (data) {
      responseData.data = data;
    }

    res.set("Content-Type", "application/json");
    res.status(statusCode).json({ ...responseData, ...extras });
    res.end();
  }

  /**
   * Send **200 OK** success status response
   */
  static status200(res, message = null, data = null, extras = {}) {
    this.sendJson(res, httpStatus.OK, message, data, extras);
  }

  /**
   * Send **201 Created** success status response
   */
  static status201(res, message = null, data = null, extras = {}) {
    this.sendJson(res, httpStatus.CREATED, message, data, extras);
  }

  /**
   * Send **204 No Content** success status response
   */
  static status204(res, message = null) {
    this.sendJson(res, httpStatus.NO_CONTENT, message);
  }

  /**
   * Send **400 Bad Request** response(validation Error Response)
   */
  static status400(
    res,
    message = "Bad Request!",
    data = null,
    errors = []
  ) {
    this.sendJson(
      res,
      httpStatus.BAD_REQUEST,
      message,
      data,
      errors.length && { errors }
    );
  }

  /**
   * Send **401 Unauthorized** client error status response
   */
  static status401(res, message = "Unauthorized!") {
    this.sendJson(res, httpStatus.UNAUTHORIZED, message);
  }

  /**
   * Send **404 Not Found** client error response
   */
  static status404(res, message = "Not Found!") {
    this.sendJson(res, httpStatus.NOT_FOUND, message);
  }

  /**
   * Send **405 Method Not Allowed response** client error response
   */
  static status405(res, message = "Method not allowed!") {
    this.sendJson(res, httpStatus.METHOD_NOT_ALLOWED, message);
  }

  /**
   * Send **500 Internal Server Error** server error response
   */
  static status500(res, err) {
    this.sendJson(res, httpStatus.INTERNAL_SERVER_ERROR, err.message, {
      details: err,
    });
  }
}

export default ResponseUtils;
