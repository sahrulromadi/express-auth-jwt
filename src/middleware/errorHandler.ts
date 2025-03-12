// file ini untuk menangani error secara global dengan cara middleware

import { Response, Request, NextFunction } from "express";
import AppError from "../utils/AppError";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { z, ZodError } from "zod";

const handleAppError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    success: false,
    type: "App Error", // buat debugging
    message: err.message,
  });
};

const handleZodError = (err: z.ZodError, res: Response) => {
  const errors = err.errors.map((error) => {
    return {
      [error.path.join(".")]: error.message,
    };
  });

  res.status(BAD_REQUEST).json({
    success: false,
    type: "Zod Error",
    message: errors,
  });
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`path = ${req.path}`, `\nerror = ${err}`);

  if (err instanceof AppError) {
    return handleAppError(err, res);
  }

  if (err instanceof ZodError) {
    return handleZodError(err, res);
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    type: "Internal Server Error",
    message: err.message || "internal server error",
  });

  return;
};

export default errorHandler;
