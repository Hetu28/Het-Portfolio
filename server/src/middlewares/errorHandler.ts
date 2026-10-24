import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { env } from "../config/env";

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const isProduction = env.NODE_ENV === "production";

  // Internal server error log
  console.error(`[ERROR] ${req.method} ${req.originalUrl || req.url}:`, {
    name: err.name,
    message: err.message,
    statusCode,
    ...(isProduction ? {} : { stack: err.stack }),
  });

  // Safe client response: never leak stack traces or internal details in production
  const response = {
    success: false,
    error: {
      code: isAppError ? err.constructor.name : "INTERNAL_SERVER_ERROR",
      message:
        isProduction && statusCode === 500
          ? "An unexpected internal server error occurred"
          : err.message,
      ...(isProduction ? {} : { stack: err.stack }),
    },
  };

  res.status(statusCode).json(response);
}
