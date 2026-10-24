import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/db";

const server = app.listen(env.PORT, () => {
  console.log("==================================================");
  console.log("🚀 Het Patel Portfolio Backend is running!");
  console.log(`📍 Environment: ${env.NODE_ENV}`);
  console.log(`📡 Server Port:  http://localhost:${env.PORT}`);
  console.log(`🩺 Healthcheck:  http://localhost:${env.PORT}/api/health`);
  console.log(`🔗 API Prefix:   http://localhost:${env.PORT}${env.API_PREFIX}`);
  console.log("==================================================");
});

// Graceful shutdown handler
async function gracefulShutdown(signal: string): Promise<void> {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  server.close(async () => {
    try {
      await prisma.$disconnect();
      console.log("Prisma client disconnected successfully.");
      process.exit(0);
    } catch (err) {
      console.error("Error during database disconnection:", err);
      process.exit(1);
    }
  });

  // Force shutdown after timeout
  setTimeout(() => {
    console.error("Could not close active connections in time, forcefully terminating.");
    process.exit(1);
  }, 10000);
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("unhandledRejection", (reason: unknown) => {
  console.error("UNHANDLED REJECTION! 💥", reason);
});

process.on("uncaughtException", (error: Error) => {
  console.error("UNCAUGHT EXCEPTION! 💥 Shutting down...", error);
  process.exit(1);
});
