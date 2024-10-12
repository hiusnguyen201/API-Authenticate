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
  static status204(res) {
    this.sendJson(res, httpStatus.NO_CONTENT);
  }

  /**
   * Send **400 Bad Request** response(validation Error Response)
   */
  static status400(res, message = "Bad Request!", errors = []) {
    this.sendJson(
      res,
      httpStatus.BAD_REQUEST,
      message,
      null,
      errors.length && { errors }
    );
  }

  /**
   * Send **401 Unauthorized** client error response
   */
  static status401(res, message = "Unauthorized!") {
    this.sendJson(res, httpStatus.UNAUTHORIZED, message);
  }

  /**
   * Send **403 Forbidden** client error response
   */
  static status403(res, message = "Forbidden!") {
    this.sendJson(res, httpStatus.FORBIDDEN, message);
  }

  /**
   * Send **404 Not Found** client error response
   */
  static status404(res, message = "Not found!") {
    this.sendJson(res, httpStatus.NOT_FOUND, message);
  }

  /**
   * Send **405 Method Not Allowed** client error response
   */
  static status405(res, message = "Method not allowed!") {
    this.sendJson(res, httpStatus.METHOD_NOT_ALLOWED, message);
  }

  /**
   * Send **429 Too Many Requests** client error response
   */
  static status429(res, message = "Too many requests!") {
    this.sendJson(res, httpStatus.TOO_MANY_REQUESTS, message);
  }

  /**
   * Send **500 Internal Server Error** server error response
   */
  static status500(res, err) {
    this.sendJson(res, httpStatus.INTERNAL_SERVER_ERROR, err.message, {
      details: err,
    });
  }

  /**
   * Send **503 Service Unavailable** server error response
   */
  static status503(res, err) {
    this.sendJson(res, httpStatus.SERVICE_UNAVAILABLE, err.message, {
      details: err,
    });
  }
}

export default ResponseUtils;
