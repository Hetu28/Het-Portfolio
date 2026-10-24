import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(5000),
  CORS_ORIGIN: z.string().default("http://localhost:3000"),
  API_PREFIX: z.string().default("/api/v1"),
  REQUEST_SIZE_LIMIT: z.string().default("10kb"),
  DATABASE_URL: z.string().default("file:./dev.db"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
