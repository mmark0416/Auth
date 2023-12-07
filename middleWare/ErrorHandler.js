import { StatusCodes } from "http-status-codes";

const ErrorHandler = (err, req, res, next) => {
  const error = {
    message: err.message || "Something went wrong",
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  res.status(error.statusCodes).json({error: error.message});
  next();
};

export default ErrorHandler;
