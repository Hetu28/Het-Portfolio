import rateLimit from "express-rate-limit";

// Rate limiter for contact enquiries: max 5 requests per 15 minutes per IP
export const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === "test" ? 1000 : 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: "RATE_LIMIT_EXCEEDED",
      message: "Too many enquiries submitted from this IP address. Please try again after 15 minutes.",
    },
  },
});
