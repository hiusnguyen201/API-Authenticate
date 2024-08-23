class ApiErrorUtils extends Error {
  constructor({ message, errors, status = 500, stack }) {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;
    this.stack = stack;
  }

  static simple(obj) {
    return new ApiErrorUtils({
      message: obj.message,
      errors: obj.errors,
      status: obj.status,
    });
  }
}

export default ApiErrorUtils;
