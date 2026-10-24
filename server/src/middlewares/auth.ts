import { Request, Response, NextFunction } from "express";
import { env } from "../config/env";

export interface AuthenticatedRequest extends Request {
  user?: {
    role: "ADMIN";
    authenticated: true;
  };
}

/**
 * Access control middleware protecting private administrative endpoints
 */
export function requireAdminAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const apiKeyHeader = req.headers["x-api-key"];

  const providedKey =
    (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null) ||
    (typeof apiKeyHeader === "string" ? apiKeyHeader : null);

  if (!providedKey) {
    res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Authentication credential is required to access this resource",
      },
    });
    return;
  }

  // Cryptographically compare provided key against configured ADMIN_API_KEY
  if (providedKey !== env.ADMIN_API_KEY) {
    res.status(403).json({
      success: false,
      error: {
        code: "FORBIDDEN",
        message: "You do not have permission to access this resource",
      },
    });
    return;
  }

  req.user = {
    role: "ADMIN",
    authenticated: true,
  };

  next();
}
