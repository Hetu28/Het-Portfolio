import { Request, Response, NextFunction } from "express";

/**
 * Enforces application/json content-type for incoming requests with a payload
 */
export function requireJsonContentType(req: Request, res: Response, next: NextFunction): void {
  // Only check requests that carry a payload body
  if (["POST", "PUT", "PATCH"].includes(req.method)) {
    const contentLength = req.headers["content-length"];
    if (contentLength && parseInt(contentLength, 10) > 0) {
      if (!req.is("application/json")) {
        res.status(415).json({
          success: false,
          error: {
            code: "UNSUPPORTED_MEDIA_TYPE",
            message: "Content-Type must be application/json",
          },
        });
        return;
      }
    }
  }
  next();
}
