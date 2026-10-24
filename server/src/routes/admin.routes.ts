import { Router, Response } from "express";
import { requireAdminAuth, AuthenticatedRequest } from "../middlewares/auth";
import { prisma } from "../config/db";

const router = Router();

// All routes in this router require administrative authentication
router.use(requireAdminAuth);

/**
 * GET /api/v1/admin/me
 * Verify administrative authorization
 */
router.get("/me", (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    data: {
      role: req.user?.role,
      authenticated: true,
    },
  });
});

/**
 * GET /api/v1/admin/enquiries
 * Retrieve private client enquiries (strictly protected behind admin authentication)
 */
router.get("/enquiries", async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json({
      success: true,
      data: inquiries,
      meta: {
        total: inquiries.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch enquiries",
      },
    });
  }
});

export default router;
