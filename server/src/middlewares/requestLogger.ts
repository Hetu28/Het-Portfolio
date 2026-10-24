import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const logData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl || req.url,
      status: res.statusCode,
      durationMs: duration,
      ip: req.ip || req.socket.remoteAddress || "unknown",
      userAgent: req.get("user-agent") || "unknown",
    };

    if (env.NODE_ENV === "development") {
      const color =
        res.statusCode >= 500
          ? "\x1b[31m"
          : res.statusCode >= 400
          ? "\x1b[33m"
          : "\x1b[32m";
      console.log(
        `[${logData.timestamp}] ${req.method} ${logData.url} ${color}${res.statusCode}\x1b[0m (${duration}ms)`
      );
    } else {
      console.log(JSON.stringify(logData));
    }
  });

  next();
}
