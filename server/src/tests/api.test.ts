import { app } from "../app";
import { prisma } from "../config/db";
import { Server } from "http";

let server: Server;
let baseUrl: string;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    throw new Error(`Assertion failed: ${testName}`);
  }
}

async function runApiTests() {
  console.log("==================================================");
  console.log("🚀 RUNNING PHASE 3 REST API INTEGRATION TESTS");
  console.log("==================================================");

  // Start ephemeral server
  await new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const address = server.address() as any;
      baseUrl = `http://localhost:${address.port}`;
      resolve();
    });
  });

  console.log(`Ephemeral test server running at: ${baseUrl}\n`);

  try {
    // -------------------------------------------------------------------------
    // 1. GET /api/v1/projects
    // -------------------------------------------------------------------------
    console.log("[Test Suite 1: Projects Endpoints]");
    {
      const res = await fetch(`${baseUrl}/api/v1/projects`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/projects returns 200 OK");
      assert(body.success === true, "Response has success: true");
      assert(Array.isArray(body.data), "Response data is an array");
      assert(body.data.length === 10, `All 10 projects returned (Found: ${body.data.length})`);
      assert(body.pagination.total === 10, "Pagination total is 10");

      // Verify shape matching frontend components
      const sample = body.data[0];
      assert(typeof sample.id === "string", "Project has id");
      assert(typeof sample.title === "string", "Project has title");
      assert(Array.isArray(sample.categories), "Project has categories array");
      assert(Array.isArray(sample.deliverables), "Project has deliverables array");
      assert(Array.isArray(sample.stills), "Project has stills array");
    }

    // Filter featured=true
    {
      const res = await fetch(`${baseUrl}/api/v1/projects?featured=true`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/projects?featured=true returns 200");
      assert(body.data.length === 6, `Exactly 6 featured projects returned (Found: ${body.data.length})`);
      assert(body.data.every((p: any) => p.featured === true), "All returned projects have featured: true");
    }

    // Filter by category
    {
      const res = await fetch(`${baseUrl}/api/v1/projects?category=narrative`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/projects?category=narrative returns 200");
      assert(body.data.length > 0, "Narrative projects found");
      assert(
        body.data.every((p: any) => p.categories.includes("narrative")),
        "All returned projects contain 'narrative' in categories"
      );
    }

    // Empty result when category does not exist
    {
      const res = await fetch(`${baseUrl}/api/v1/projects?category=nonexistent`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/projects?category=nonexistent returns 200 OK");
      assert(body.success === true, "Response has success: true for empty query");
      assert(Array.isArray(body.data) && body.data.length === 0, "Empty dataset returns empty array []");
      assert(body.pagination.total === 0, "Pagination total is 0 for empty dataset");
    }

    // -------------------------------------------------------------------------
    // 2. GET /api/v1/projects/:id
    // -------------------------------------------------------------------------
    console.log("\n[Test Suite 2: Single Project by ID]");
    {
      const res = await fetch(`${baseUrl}/api/v1/projects/pole-47`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/projects/pole-47 returns 200 OK");
      assert(body.data.id === "pole-47", "Returned project has correct ID");
      assert(body.data.stills.length === 13, "Pole 47 has 13 case study stills");
      assert(body.data.technicalSpecs.camera === "Sony Cinema Line", "Camera spec matches verified data");
      assert(body.data.technicalSpecs.aspectRatio === "2.39:1 CinemaScope", "Aspect ratio matches verified data");
    }

    // Missing Project -> 404
    {
      const res = await fetch(`${baseUrl}/api/v1/projects/non-existent-film-999`);
      const body = await res.json();
      assert(res.status === 404, "GET non-existent project returns 404 Not Found");
      assert(body.success === false, "Error response has success: false");
      assert(body.error.code === "NotFoundError", "Error code is NotFoundError");
    }

    // -------------------------------------------------------------------------
    // 3. GET /api/v1/filmography
    // -------------------------------------------------------------------------
    console.log("\n[Test Suite 3: Filmography Endpoint]");
    {
      const res = await fetch(`${baseUrl}/api/v1/filmography`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/filmography returns 200 OK");
      assert(body.data.length === 3, "Returns 3 role groups");
      assert(body.data[0].role === "DIRECTOR & WRITER", "Group 1 is DIRECTOR & WRITER");
      assert(body.data[1].role === "CINEMATOGRAPHER (DOP)", "Group 2 is CINEMATOGRAPHER (DOP)");
      assert(body.data[2].role === "EDITOR", "Group 3 is EDITOR");
      assert(body.data[0].items.length === 6, "Director group has 6 films");
      assert(typeof body.data[0].items[0].meta === "string", "Film item has meta tag");
    }

    // -------------------------------------------------------------------------
    // 4. GET /api/v1/contributions
    // -------------------------------------------------------------------------
    console.log("\n[Test Suite 4: Contributions (Cinema Seats) Endpoint]");
    {
      const res = await fetch(`${baseUrl}/api/v1/contributions`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/contributions returns 200 OK");
      assert(body.data.length === 27, `Returns all 27 cinema seat films (Found: ${body.data.length})`);
      assert(body.data[0].seat === "A1", "First seat is A1");
      assert(body.data[26].seat === "F2", "Last seat is F2");
    }

    // Filter by category
    {
      const res = await fetch(`${baseUrl}/api/v1/contributions?category=Sound%20%26%20Technical`);
      const body = await res.json();
      assert(res.status === 200, "Filter contributions by category returns 200");
      assert(
        body.data.every((c: any) => c.category === "Sound & Technical"),
        "Filtered items only contain Sound & Technical"
      );
    }

    // Empty result when category does not exist
    {
      const res = await fetch(`${baseUrl}/api/v1/contributions?category=NonExistentCategory`);
      const body = await res.json();
      assert(res.status === 200, "Filter contributions with unknown category returns 200");
      assert(Array.isArray(body.data) && body.data.length === 0, "Empty contributions returns empty array []");
    }

    // -------------------------------------------------------------------------
    // 5. GET /api/v1/collaborations
    // -------------------------------------------------------------------------
    console.log("\n[Test Suite 5: Collaborations Endpoint]");
    {
      const res = await fetch(`${baseUrl}/api/v1/collaborations`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/collaborations returns 200 OK");
      assert(Array.isArray(body.data.freelance), "Returns freelance array");
      assert(Array.isArray(body.data.brands), "Returns brands array");
      assert(body.data.freelance.length === 3, "Returns 3 freelance projects");
      assert(body.data.brands.length === 7, "Returns 7 brand collaborations");
    }

    // -------------------------------------------------------------------------
    // 6. GET /api/v1/faqs
    // -------------------------------------------------------------------------
    console.log("\n[Test Suite 6: FAQs Endpoint]");
    {
      const res = await fetch(`${baseUrl}/api/v1/faqs`);
      const body = await res.json();
      assert(res.status === 200, "GET /api/v1/faqs returns 200 OK");
      assert(body.data.length === 5, "Returns exactly 5 FAQ items");
      assert(body.data[0].id === 1, "FAQ item 1 has correct id");
      assert(typeof body.data[0].question === "string", "FAQ has question");
      assert(typeof body.data[0].answer === "string", "FAQ has answer");
    }

    // -------------------------------------------------------------------------
    // 7. POST /api/v1/enquiries (Contact Form Submissions)
    // -------------------------------------------------------------------------
    console.log("\n[Test Suite 7: Enquiry Submission & Validations]");
    // Successful Submission
    {
      const validPayload = {
        name: "Christopher Nolan",
        email: "nolan@syncopy.com",
        phone: "+91 9876543210",
        subject: "Directing & Screenplay",
        referral: "Film Festival Showcase",
        message: "We have an upcoming 35mm narrative feature film and would love to collaborate.",
      };

      const res = await fetch(`${baseUrl}/api/v1/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      });

      const body = await res.json();
      assert(res.status === 201, "Valid enquiry returns 201 Created");
      assert(body.success === true, "Enquiry response has success: true");
      assert(typeof body.data.inquiryId === "string", "Enquiry returns unique inquiryId");

      // Verify in database
      const saved = await prisma.inquiry.findUnique({ where: { id: body.data.inquiryId } });
      assert(!!saved, "Enquiry saved in database");
      assert(saved?.name === "Christopher Nolan", "Saved name matches");
      assert(saved?.email === "nolan@syncopy.com", "Saved email matches");
      assert(saved?.status === "UNREAD", "Saved status is default UNREAD");
    }

    // Minimal Submission (From Inline Form: name, email, message only)
    {
      const minimalPayload = {
        name: "Emma Thomas",
        email: "emma@syncopy.com",
        message: "Need a director for a commercial campaign next month.",
      };

      const res = await fetch(`${baseUrl}/api/v1/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(minimalPayload),
      });

      const body = await res.json();
      assert(res.status === 201, "Minimal enquiry from inline form returns 201 Created");
      assert(body.success === true, "Minimal enquiry succeeded");
    }

    // Invalid Submission: Invalid Email -> 400
    {
      const invalidPayload = {
        name: "John Doe",
        email: "not-an-email",
        message: "Testing validation on invalid email address.",
      };

      const res = await fetch(`${baseUrl}/api/v1/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidPayload),
      });

      const body = await res.json();
      assert(res.status === 400, "Invalid email returns 400 Bad Request");
      assert(body.success === false, "Error response has success: false");
      assert(body.error.code === "VALIDATION_ERROR", "Error code is VALIDATION_ERROR");
      assert(
        body.error.details.some((d: any) => d.field === "email"),
        "Validation errors include email field"
      );
    }

    // Invalid Submission: Message too short -> 400
    {
      const invalidPayload = {
        name: "John Doe",
        email: "john@example.com",
        message: "Hi", // < 10 chars
      };

      const res = await fetch(`${baseUrl}/api/v1/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidPayload),
      });

      const body = await res.json();
      assert(res.status === 400, "Message shorter than 10 chars returns 400 Bad Request");
      assert(
        body.error.details.some((d: any) => d.field === "message"),
        "Validation errors include message field"
      );
    }

    // -------------------------------------------------------------------------
    // 8. Safe 404 for Unknown API Routes
    // -------------------------------------------------------------------------
    console.log("\n[Test Suite 8: Safe 404 Responses]");
    {
      const res = await fetch(`${baseUrl}/api/v1/unregistered-path`);
      const body = await res.json();
      assert(res.status === 404, "Unregistered API route returns 404");
      assert(body.error.code === "NOT_FOUND", "Error code is NOT_FOUND");
    }

    console.log("\n==================================================");
    console.log("🏁 ALL 28 API INTEGRATION TESTS PASSED SUCCESSFULLY!");
    console.log("==================================================");
  } finally {
    server.close();
    await prisma.$disconnect();
  }
}

runApiTests().catch((err) => {
  console.error("API Integration Test Failed:", err);
  process.exit(1);
});
