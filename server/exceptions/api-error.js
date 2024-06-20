module.exports = class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
  static UnauthorizedError() {
    return new ApiError(401, "Пользователь не авторизован");
  }
  static ForbiddenError() {
    return new ApiError(403, "Недостаточно прав");
  }
  static badRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
  static Unprocessable(message, errors = []) {
    return new ApiError(422, message, errors);
  }
  static Conflict(message, errors = []) {
    return new ApiError(409, message, errors);
  }
  static NotFound(message, errors = []) {
    return new ApiError(404, message, errors);
  }
};