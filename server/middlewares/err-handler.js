const { StatusCodes } = require("http-status-codes");

const errHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong please try again!",
  };

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;

    const errorTypes = Object.keys(err.errors);
    customError.message = errorTypes
      .map((errType) => err.errors[errType].message)
      .join(", ");
  }
  return res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errHandler;
