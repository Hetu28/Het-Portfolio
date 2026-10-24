import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const prisma = new PrismaClient();

async function resetDatabase(): Promise<void> {
  const nodeEnv = process.env.NODE_ENV || "development";
  const dbUrl = process.env.DATABASE_URL || "";

  console.log("==================================================");
  console.log("⚠️  HET PATEL PORTFOLIO - DATABASE RESET UTILITY");
  console.log("==================================================");
  console.log(`Environment: ${nodeEnv}`);

  // CRITICAL PRODUCTION SAFETY GUARD
  const isProduction =
    nodeEnv === "production" ||
    (!dbUrl.includes("dev.db") && !dbUrl.includes("localhost") && !dbUrl.includes("127.0.0.1"));

  if (isProduction) {
    if (process.env.CONFIRM_PRODUCTION_DATABASE_RESET !== "YES_I_AM_SURE") {
      console.error(
        "\n🛑 SAFETY BLOCKED: You are running reset on a production or non-local database!"
      );
      console.error(
        "To execute a production reset, you MUST explicitly set: CONFIRM_PRODUCTION_DATABASE_RESET=YES_I_AM_SURE"
      );
      process.exit(1);
    }
    console.warn("\n⚠️  PRODUCTION OVERRIDE DETECTED. Proceeding with caution...");
  }

  console.log("\nCleaning existing database records atomically...");

  // Atomic deletion respecting foreign key constraints
  await prisma.$transaction([
    prisma.projectStill.deleteMany(),
    prisma.technicalSpecs.deleteMany(),
    prisma.projectDeliverable.deleteMany(),
    prisma.projectCategoryMapping.deleteMany(),
    prisma.project.deleteMany(),
    prisma.filmographyItem.deleteMany(),
    prisma.filmographyGroup.deleteMany(),
    prisma.contributionFilm.deleteMany(),
    prisma.freelanceProjectRole.deleteMany(),
    prisma.freelanceProject.deleteMany(),
    prisma.brandCollaboration.deleteMany(),
    prisma.fAQ.deleteMany(),
    prisma.siteSetting.deleteMany(),
    prisma.inquiry.deleteMany(),
    prisma.adminUser.deleteMany(),
  ]);

  console.log("✅ All tables cleaned successfully.");
  console.log("Database reset complete. Run 'npm run db:seed' to re-seed verified content.");
}

resetDatabase()
  .catch((e) => {
    console.error("❌ Reset error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
