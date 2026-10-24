import http from "http";
import { app } from "../app";
import { env } from "../config/env";
import { prisma } from "../config/db";

let server: http.Server;
let baseUrl: string;

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failed++;
  }
}

async function request(
  path: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    rawBody?: string;
  } = {}
) {
  const method = options.method || "GET";
  const headers: Record<string, string> = { ...options.headers };

  let payload = options.rawBody;
  if (options.body !== undefined && payload === undefined) {
    payload = JSON.stringify(options.body);
    if (!headers["content-type"] && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: payload,
  });

  const contentType = res.headers.get("content-type") || "";
  let data: any = null;
  if (contentType.includes("application/json")) {
    data = await res.json().catch(() => null);
  } else {
    data = await res.text().catch(() => null);
  }

  return {
    status: res.status,
    headers: res.headers,
    data,
  };
}

async function runSecurityTestSuite() {
  console.log("\n==================================================");
  console.log("🛡️  RUNNING PHASE 5 SECURITY HARDENING TEST SUITE");
  console.log("==================================================\n");

  server = app.listen(0);
  const address = server.address() as any;
  baseUrl = `http://localhost:${address.port}`;
  console.log(`Ephemeral security test server running at: ${baseUrl}\n`);

  try {
    // ----------------------------------------------------
    // WORKSTREAM 1: INPUT VALIDATION & INJECTION DEFENSE
    // ----------------------------------------------------
    console.log("[Workstream 1: Input Validation & Injection Protection]");

    // 1.1 Strict Schema Rejection on Unexpected Fields
    const resExtraFields = await request("/api/v1/enquiries", {
      method: "POST",
      body: {
        name: "Security Tester",
        email: "sec@example.com",
        message: "Valid test message for security testing.",
        unrecognizedEvilProperty: "injected",
      },
    });
    assert(resExtraFields.status === 400, "Unexpected/unrecognized fields rejected with 400 Bad Request");
    assert(resExtraFields.data?.success === false, "Strict rejection returns success: false");

    // 1.2 Content-Type Enforcement (Reject non-JSON payloads)
    const resWrongContentType = await request("/api/v1/enquiries", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      rawBody: "raw plain text payload not json",
    });
    assert(resWrongContentType.status === 415, "Non-JSON Content-Type rejected with 415 Unsupported Media Type");

    // 1.3 Payload Size Limit Enforcement (> 10kb)
    const hugePayload = {
      name: "Flooder",
      email: "flood@example.com",
      message: "A".repeat(15000), // 15 KB payload exceeds 10KB limit
    };
    const resPayloadTooLarge = await request("/api/v1/enquiries", {
      method: "POST",
      body: hugePayload,
    });
    assert(resPayloadTooLarge.status === 413, "Oversized payload (>10KB) rejected with 413 Payload Too Large");

    // 1.4 SQL Injection Defense on Path Parameters
    const sqlInjectionIds = [
      "pole-47' OR '1'='1",
      "pole-47; DROP TABLE Project; --",
      "../etc/passwd",
      "pole-47' UNION SELECT * FROM AdminUser --",
    ];
    for (const sqli of sqlInjectionIds) {
      const resSqli = await request(`/api/v1/projects/${encodeURIComponent(sqli)}`);
      assert(resSqli.status === 400, `SQL injection in path parameter '${sqli}' blocked with 400`);
    }

    // 1.5 Stored XSS Neutralization
    const xssPayload = {
      name: 'Tester <script>alert("XSS")</script>',
      email: "xss.clean@example.com",
      message: 'Hello <iframe src="javascript:alert(1)"></iframe> world with valid length.',
    };
    const resXss = await request("/api/v1/enquiries", {
      method: "POST",
      body: xssPayload,
    });
    assert(resXss.status === 201, "Sanitized enquiry accepted with 201 Created");
    if (resXss.data?.data?.inquiryId) {
      const saved = await prisma.inquiry.findUnique({
        where: { id: resXss.data.data.inquiryId },
      });
      assert(
        !saved?.name.includes("<script>"),
        "Stored XSS <script> tag neutralized in database record"
      );
      assert(
        !saved?.message.includes("<iframe"),
        "Stored XSS <iframe> tag neutralized in database record"
      );
      await prisma.inquiry.delete({ where: { id: resXss.data.data.inquiryId } }).catch(() => {});
    }

    // ----------------------------------------------------
    // WORKSTREAM 2: AUTHENTICATION & ACCESS CONTROL
    // ----------------------------------------------------
    console.log("\n[Workstream 2: Authentication & Access Control]");

    // 2.1 Confidentiality: No Public Read for Enquiries
    const resPublicEnquiries = await request("/api/v1/enquiries");
    assert(resPublicEnquiries.status === 404, "Public GET /api/v1/enquiries is blocked (returns 404 Not Found)");

    // 2.2 Unauthenticated Access to Admin API
    const resAdminNoAuth = await request("/api/v1/admin/enquiries");
    assert(resAdminNoAuth.status === 401, "Unauthenticated access to /admin/enquiries rejected with 401 Unauthorized");
    assert(resAdminNoAuth.data?.error?.code === "UNAUTHORIZED", "Error code is UNAUTHORIZED");

    // 2.3 Invalid Credentials to Admin API
    const resAdminBadAuth = await request("/api/v1/admin/enquiries", {
      headers: { "x-api-key": "wrong-secret-key" },
    });
    assert(resAdminBadAuth.status === 403, "Invalid admin credential rejected with 403 Forbidden");

    // 2.4 Authorized Admin Access with Valid Key
    const resAdminValid = await request("/api/v1/admin/me", {
      headers: { "x-api-key": env.ADMIN_API_KEY },
    });
    assert(resAdminValid.status === 200, "Valid admin key grants access (returns 200 OK)");
    assert(resAdminValid.data?.data?.role === "ADMIN", "Authenticated identity verified as ADMIN");

    // ----------------------------------------------------
    // WORKSTREAM 3: SECURITY HEADERS & TRANSPORT SECURITY
    // ----------------------------------------------------
    console.log("\n[Workstream 3: Security Headers, Transport & Clickjacking Protection]");

    const resHeaders = await request("/api/health");
    assert(
      resHeaders.headers.get("x-content-type-options") === "nosniff",
      "X-Content-Type-Options: nosniff header is present"
    );
    assert(
      resHeaders.headers.get("x-frame-options") === "DENY",
      "X-Frame-Options: DENY clickjacking protection is present"
    );
    assert(
      resHeaders.headers.has("content-security-policy"),
      "Content-Security-Policy (CSP) header is present"
    );
    assert(
      resHeaders.headers.get("referrer-policy") === "strict-origin-when-cross-origin",
      "Referrer-Policy: strict-origin-when-cross-origin is present"
    );

    // ----------------------------------------------------
    // WORKSTREAM 4: CORS ORIGIN RESTRICTION
    // ----------------------------------------------------
    console.log("\n[Workstream 4: Strict CORS Enforcement]");

    // Allowed origin
    const resCorsAllowed = await request("/api/v1/projects", {
      headers: { Origin: "http://localhost:3000" },
    });
    assert(
      resCorsAllowed.headers.get("access-control-allow-origin") === "http://localhost:3000",
      "Whitelisted frontend origin 'http://localhost:3000' permitted by CORS"
    );

    // Unauthorized origin
    const resCorsDenied = await request("/api/v1/projects", {
      headers: { Origin: "http://unauthorized-evil-origin.com" },
    });
    assert(
      resCorsDenied.status === 403 || resCorsDenied.data?.success === false,
      "Unauthorized origin 'http://unauthorized-evil-origin.com' blocked by CORS"
    );

    // ----------------------------------------------------
    // WORKSTREAM 5: ERROR HANDLING & INFORMATION DISCLOSURE
    // ----------------------------------------------------
    console.log("\n[Workstream 5: Error Sanitization & Zero Leakage]");

    // 5.1 Malformed JSON Syntax Handling
    const resMalformedJson = await request("/api/v1/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      rawBody: '{"name": "broken json",,, invalid}',
    });
    assert(resMalformedJson.status === 400, "Malformed JSON syntax handled with 400 Bad Request");
    assert(resMalformedJson.data?.error?.code === "MALFORMED_JSON", "Error code is MALFORMED_JSON");

    // 5.2 Masked 404 Routes
    const resSafe404 = await request("/api/v1/some-random-missing-route");
    assert(resSafe404.status === 404, "Non-existent route returns clean 404");
    assert(resSafe404.data?.error?.code === "NOT_FOUND", "Error response uses standard error envelope");
    assert(!resSafe404.data?.error?.stack, "Error response does not leak internal stack traces");

  } finally {
    server.close();
    await prisma.$disconnect();
  }

  console.log("\n==================================================");
  console.log(`🏁 SECURITY TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log("==================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runSecurityTestSuite().catch((err) => {
  console.error("Fatal test error:", err);
  process.exit(1);
});
