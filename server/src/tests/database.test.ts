import { prisma } from "../config/db";

async function runDatabaseTests(): Promise<void> {
  console.log("==================================================");
  console.log("🧪 RUNNING DATABASE INTEGRATION & CONSTRAINT TESTS");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // Test 1: Verified Counts from Seed
    console.log("\n[Test Suite 1: Seed Data Verification]");
    const projectCount = await prisma.project.count();
    assert(projectCount === 10, `Projects count is 10 (Found: ${projectCount})`);

    const featuredCount = await prisma.project.count({ where: { featured: true } });
    assert(featuredCount === 6, `Featured projects count is 6 (Found: ${featuredCount})`);

    const seatCount = await prisma.contributionFilm.count();
    assert(seatCount === 27, `Contribution cinema seats count is 27 (Found: ${seatCount})`);

    const faqCount = await prisma.fAQ.count();
    assert(faqCount === 5, `FAQ count is 5 (Found: ${faqCount})`);

    const groupCount = await prisma.filmographyGroup.count();
    assert(groupCount === 3, `Filmography groups count is 3 (Found: ${groupCount})`);

    const brandCount = await prisma.brandCollaboration.count();
    assert(brandCount === 7, `Brand collaborations count is 7 (Found: ${brandCount})`);

    const settingCount = await prisma.siteSetting.count();
    assert(settingCount === 9, `Site settings count is 9 (Found: ${settingCount})`);

    // Test 2: Relational Queries & Deep Joins
    console.log("\n[Test Suite 2: Relational Joins & Data Integrity]");
    const pole47 = await prisma.project.findUnique({
      where: { id: "pole-47" },
      include: {
        categories: true,
        deliverables: true,
        stills: true,
        technicalSpecs: true,
      },
    });
    assert(!!pole47, "Pole 47 project exists");
    assert(pole47?.stills.length === 13, `Pole 47 has 13 stills (Found: ${pole47?.stills.length})`);
    assert(pole47?.technicalSpecs?.camera === "Sony Cinema Line", "Pole 47 technical specs camera matches");
    assert(
      pole47?.categories.some((c) => c.category === "cinematography") ?? false,
      "Pole 47 has 'cinematography' category"
    );

    const voidProject = await prisma.project.findUnique({
      where: { id: "void" },
      include: { stills: true, technicalSpecs: true },
    });
    assert(voidProject?.stills.length === 9, `Void project has 9 stills (Found: ${voidProject?.stills.length})`);
    assert(
      voidProject?.technicalSpecs?.camera === "Sony FX30 Cinema Line",
      "Void technical specs camera matches"
    );

    // Test 3: Unique Constraint Enforcements
    console.log("\n[Test Suite 3: Unique Constraint Enforcements]");
    let uniqueConstraintCaught = false;
    try {
      // Attempt to insert duplicate seat 'A1'
      await prisma.contributionFilm.create({
        data: {
          seat: "A1",
          title: "Duplicate Film",
          role: "DOP",
          year: "2026",
          category: "Cinematography & Camera",
        },
      });
    } catch (e: any) {
      uniqueConstraintCaught = true;
    }
    assert(uniqueConstraintCaught, "Duplicate seat code 'A1' rejected by unique constraint");

    let uniqueAdminCaught = false;
    try {
      // Attempt duplicate admin email
      await prisma.adminUser.create({
        data: {
          email: "admin@hetpatel.com",
          name: "Duplicate",
          passwordHash: "hash",
        },
      });
    } catch (e: any) {
      uniqueAdminCaught = true;
    }
    assert(uniqueAdminCaught, "Duplicate admin email rejected by unique constraint");

    // Test 4: Cascade Deletion on Relations
    console.log("\n[Test Suite 4: Cascade Deletion]");
    // Create temporary project with deliverables and stills
    const tempProject = await prisma.project.create({
      data: {
        id: "temp-test-project",
        title: "Temporary Test",
        category: "Test",
        role: "Tester",
        year: "2026",
        duration: "1 min",
        image: "/images/test.jpg",
        synopsis: "Testing cascade delete",
        categories: { create: [{ category: "test" }] },
        deliverables: { create: [{ name: "Testing" }] },
        stills: {
          create: [{ id: "temp-still-01", url: "/images/test.jpg", title: "Still" }],
        },
      },
    });

    // Delete project
    await prisma.project.delete({ where: { id: tempProject.id } });

    // Verify cascade deleted children
    const orphanedStill = await prisma.projectStill.findUnique({ where: { id: "temp-still-01" } });
    assert(orphanedStill === null, "Associated still was cascade-deleted with parent project");

    const orphanedCategories = await prisma.projectCategoryMapping.findMany({
      where: { projectId: "temp-test-project" },
    });
    assert(orphanedCategories.length === 0, "Associated category mappings cascade-deleted");

    // Test 5: Atomic Transactions & Rollback
    console.log("\n[Test Suite 5: Atomic Transactions & Rollback]");
    const countBeforeTx = await prisma.inquiry.count();
    let txFailedAsExpected = false;

    try {
      await prisma.$transaction(async (tx) => {
        await tx.inquiry.create({
          data: {
            name: "Tx Test User",
            email: "txtest@example.com",
            message: "This should be rolled back",
          },
        });
        // Intentionally throw error to force rollback
        throw new Error("Intentional Rollback Trigger");
      });
    } catch (err: any) {
      if (err.message === "Intentional Rollback Trigger") {
        txFailedAsExpected = true;
      }
    }

    const countAfterTx = await prisma.inquiry.count();
    assert(txFailedAsExpected, "Transaction aborted as expected");
    assert(countBeforeTx === countAfterTx, "Transaction rollback preserved data integrity");

    console.log("\n==================================================");
    console.log(`🏁 TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
    console.log("==================================================");

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("Unexpected test failure:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runDatabaseTests();
