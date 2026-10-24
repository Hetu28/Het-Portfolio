import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import { env } from "../config/env";

const isProduction = env.NODE_ENV === "production";

/**
 * Enterprise-grade Security Headers via Helmet
 */
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: [
        "'self'",
        "data:",
        "https://images.unsplash.com",
        "https://images.pexels.com",
        "https://cdn.pixabay.com",
      ],
      mediaSrc: [
        "'self'",
        "https://cdn.pixabay.com",
        "https://*.youtube.com",
        "https://*.googlevideo.com",
      ],
      frameSrc: [
        "'self'",
        "https://www.youtube.com",
        "https://www.youtube-nocookie.com",
        "https://player.vimeo.com",
      ],
      connectSrc: [
        "'self'",
        "http://localhost:3000",
        "http://localhost:5000",
        "https://het-portfolio-phi.vercel.app",
        ...(env.CORS_ORIGIN ? env.CORS_ORIGIN.split(",").map((o) => o.trim()) : []),
      ],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: isProduction ? [] : null,
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" },
  hsts: isProduction
    ? {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      }
    : false,
  noSniff: true,
  frameguard: { action: "deny" },
  referrerPolicy: { policy: "strict-origin-when-cross-origin" },
});

/**
 * Strict Origin CORS Whitelist
 */
const allowedOrigins = env.CORS_ORIGIN.split(",").map((o) => o.trim());

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile, curl, server-to-server health checks)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: Origin '${origin}' is not authorized.`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "x-api-key"],
  maxAge: 86400, // 24 hours preflight cache
};

export const corsMiddleware = cors(corsOptions);
