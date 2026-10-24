import { Router } from "express";
import { getContributions } from "../controllers/contribution.controller";
import { validate } from "../middlewares/validate";
import { getContributionsQuerySchema } from "../validators/contribution.validator";

const router = Router();

// GET /api/v1/contributions
router.get("/contributions", validate({ query: getContributionsQuerySchema }), getContributions);

export default router;
