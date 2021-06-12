import { NextFunction, Request, Response } from "express";
import HttpException from "../../helpers/exceptions/http.exception";

const errorMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "DEFAULT ERROR: Something went wrong";
  response.status(status);
  response.send({
    message,
  });
};

export default errorMiddleware;
