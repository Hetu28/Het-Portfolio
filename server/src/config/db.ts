import { PrismaClient } from "@prisma/client";

// Global singleton pattern to avoid connection leaks during dev hot-reload
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export interface DbHealthResult {
  status: "connected" | "disconnected";
  latencyMs?: number;
}

/**
 * Safely verify database connectivity without leaking credentials or internal stack trace
 */
export async function checkDatabaseConnection(): Promise<DbHealthResult> {
  const start = Date.now();
  try {
    // Run a lightweight raw query
    await prisma.$queryRawUnsafe("SELECT 1;");
    return {
      status: "connected",
      latencyMs: Date.now() - start,
    };
  } catch (error) {
    return {
      status: "disconnected",
    };
  }
}
