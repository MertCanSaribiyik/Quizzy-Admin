import constants from "../constants.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode || 500;
  let errorMessage = err.message;

  if (err.name === "MongooseError") {
    statusCode = 400;
  } else if (err.name === "CastError") {
    statusCode = 400;
  }

  res.status(statusCode).json({
    title: getTitle(statusCode),
    message: errorMessage,
    stackTrace: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

const getTitle = (statusCode) => {
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      return "Validation Failed";
    case constants.UNAUTHORIZED:
      return "Unauthorized";
    case constants.FORBIDDEN:
      return "Forbidden";
    case constants.NOT_FOUND:
      return "Not Found";
    case constants.SERVER_ERROR:
      return "SERVER Error";
    default:
      return "An unknown error";
  }
};

export default errorHandler;
