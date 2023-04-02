const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong try again later",
  };
  if (err.name === "CastError") {
    customError.msg = `No items found with this id ${err.value}`;
    customError.status = StatusCodes.NOT_FOUND;
  }
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((value) => {
        return value.message;
      })
      .join(",");
  }
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(customError.status).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
