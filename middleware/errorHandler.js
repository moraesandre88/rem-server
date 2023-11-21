const {isHttpError} = require("http-errors");
const recordEvents = require("../config/recordEvents");

const errorHandler = (error, req, res, next) => {
  let errorMessage = "Ocorreu um erro desconhecido";
  let statusCode = 500;
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  recordEvents(`(${error.statusCode}) ${error.name}: ${error.message}`, "errLog.txt");
  res.status(statusCode).json({message: errorMessage});
};

module.exports = errorHandler;
