class BaseError extends Error {
  constructor(message, statusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}

class AuthenticationError extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}

class ConflictError extends BaseError {
  constructor(message) {
    super(message, 409);
  }
}

class NotFoundError extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}

export {
  BaseError,
  ValidationError,
  AuthenticationError,
  ConflictError,
  NotFoundError,
};
