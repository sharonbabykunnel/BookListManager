const errorHandler = (err, req, res, next) => {

  // Default error response
  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "An unexpected error occurred";

  // Detailed error response for development
  const errorResponse = {
    success: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      originalError: err.toString(),
    }),
  };

  res.status(statusCode).json(errorResponse);
};

export default errorHandler;
