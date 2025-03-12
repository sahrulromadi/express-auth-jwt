// file ini untuk menangani error secara global dengan cara middleware

import { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError";
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from "../constants/http";
import { ZodError } from "zod";

const handleAppError: ErrorRequestHandler = (err: AppError, req, res, next) => {
  res.status(err.statusCode).json({
    success: false,
    type: "App Error", // buat debugging
    message: err.message,
  });
};

const handleZodError: ErrorRequestHandler = (err: ZodError, req, res, next) => {
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

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`path = ${req.path}`, `\nerror = ${err}`);

  if (err instanceof AppError) {
    return handleAppError(err, req, res, next);
  }

  if (err instanceof ZodError) {
    return handleZodError(err, req, res, next);
  }

  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    type: "Internal Server Error",
    message: err.message || "internal server error",
  });

  return;
};

export default errorHandler;
