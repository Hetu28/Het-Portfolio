import { Router } from "express";
import { getFaqs } from "../controllers/faq.controller";

const router = Router();

// GET /api/v1/faqs
router.get("/faqs", getFaqs);

export default router;
