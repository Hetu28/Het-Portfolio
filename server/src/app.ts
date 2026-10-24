import express, { Application } from "express";
import { env } from "./config/env";
import { securityHeaders, corsMiddleware } from "./middlewares/security";
import { requestLogger } from "./middlewares/requestLogger";
import { notFoundHandler } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import apiV1Routes from "./routes";
import { getHealth } from "./controllers/health.controller";

export function createApp(): Application {
  const app = express();

  // Trust upstream reverse proxies (Vercel, Render, Railway, Nginx)
  app.set("trust proxy", 1);

  // Security headers & CORS
  app.use(securityHeaders);
  app.use(corsMiddleware);

  // Explicit body parsers with size limit
  app.use(express.json({ limit: env.REQUEST_SIZE_LIMIT }));
  app.use(express.urlencoded({ extended: true, limit: env.REQUEST_SIZE_LIMIT }));

  // Structured request logging
  app.use(requestLogger);

  // Top-level health endpoints for load-balancers & orchestrators
  app.get("/health", getHealth);
  app.get("/api/health", getHealth);

  // Versioned API routes under /api/v1
  app.use(env.API_PREFIX, apiV1Routes);

  // Catch-all 404 handler for unknown routes
  app.use(notFoundHandler);

  // Centralized error handler
  app.use(errorHandler);

  return app;
}

export const app = createApp();
