import rateLimit from "express-rate-limit";

const isTest = process.env.NODE_ENV === "test";

/**
 * Global rate limiter for public API endpoints: 100 requests per 15 minutes
 */
export const globalApiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTest ? 10000 : 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many requests from this IP address. Please try again after 15 minutes.",
    },
  },
});

/**
 * Strict rate limiter for contact enquiries: max 5 requests per 15 minutes
 */
export const enquiryRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTest ? 1000 : 5,
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

/**
 * Strict rate limiter for administrative access attempts: max 10 attempts per 15 minutes
 */
export const adminAuthRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTest ? 1000 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: "TOO_MANY_REQUESTS",
      message: "Too many administrative attempts. Access temporarily throttled.",
    },
  },
});
