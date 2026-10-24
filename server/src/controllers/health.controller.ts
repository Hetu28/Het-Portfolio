import { Request, Response } from "express";
import { checkDatabaseConnection } from "../config/db";
import { env } from "../config/env";

const startTime = Date.now();

export async function getHealth(_req: Request, res: Response): Promise<void> {
  const dbHealth = await checkDatabaseConnection();
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const isHealthy = dbHealth.status === "connected";

  const responseBody = {
    status: isHealthy ? "ok" : "degraded",
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: `${uptimeSeconds}s`,
    version: "1.0.0",
    services: {
      api: "healthy",
      database: dbHealth.status,
      ...(dbHealth.latencyMs !== undefined ? { dbLatencyMs: dbHealth.latencyMs } : {}),
    },
  };

  res.status(isHealthy ? 200 : 503).json(responseBody);
}
