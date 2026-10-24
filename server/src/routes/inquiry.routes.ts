import { Router } from "express";
import { createEnquiry } from "../controllers/inquiry.controller";
import { validate } from "../middlewares/validate";
import { enquiryRateLimiter } from "../middlewares/rateLimiter";
import { requireJsonContentType } from "../middlewares/contentType";
import { createEnquirySchema } from "../validators/inquiry.validator";

const router = Router();

// POST /api/v1/enquiries
router.post(
  "/enquiries",
  requireJsonContentType,
  enquiryRateLimiter,
  validate({ body: createEnquirySchema }),
  createEnquiry
);

// POST /api/v1/inquiries (alias)
router.post(
  "/inquiries",
  requireJsonContentType,
  enquiryRateLimiter,
  validate({ body: createEnquirySchema }),
  createEnquiry
);

export default router;
