import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { env } from "../config/env";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const isProduction = env.NODE_ENV === "production";
  const isAppError = err instanceof AppError;
  const isSyntaxError = err instanceof SyntaxError && (err as any).status === 400 && "body" in err;
  const isPayloadTooLarge = err.type === "entity.too.large" || (err as any).status === 413;
  const isCorsError = err.message && err.message.includes("CORS blocked");

  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let errorMessage = "An unexpected internal server error occurred";

  if (isAppError) {
    statusCode = err.statusCode;
    errorCode = err.constructor.name;
    errorMessage = err.message;
  } else if (isSyntaxError) {
    statusCode = 400;
    errorCode = "MALFORMED_JSON";
    errorMessage = "Malformed JSON syntax in request body";
  } else if (isPayloadTooLarge) {
    statusCode = 413;
    errorCode = "PAYLOAD_TOO_LARGE";
    errorMessage = `Request payload exceeds maximum allowed size of ${env.REQUEST_SIZE_LIMIT}`;
  } else if (isCorsError) {
    statusCode = 403;
    errorCode = "CORS_FORBIDDEN";
    errorMessage = err.message;
  } else if (!isProduction) {
    errorMessage = err.message || errorMessage;
  }

  // Security event logging: log error metadata without recording sensitive request bodies
  console.error(`[SECURITY/ERROR] ${req.method} ${req.originalUrl || req.url} - ${statusCode}:`, {
    code: errorCode,
    message: err.message,
    ip: req.ip || req.socket.remoteAddress || "unknown",
    ...(isProduction ? {} : { stack: err.stack }),
  });

  // Client response: zero stack trace or internal information disclosure in production
  const response = {
    success: false,
    error: {
      code: errorCode,
      message: errorMessage,
      ...(isProduction ? {} : { stack: err.stack }),
    },
  };

  res.status(statusCode).json(response);
}
