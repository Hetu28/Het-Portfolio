import { Router } from "express";
import healthRoutes from "./health.routes";
import projectRoutes from "./project.routes";
import filmographyRoutes from "./filmography.routes";
import contributionRoutes from "./contribution.routes";
import collaborationRoutes from "./collaboration.routes";
import faqRoutes from "./faq.routes";
import inquiryRoutes from "./inquiry.routes";

const router = Router();

// Mount public routes under /api/v1
router.use("/", healthRoutes);
router.use("/", projectRoutes);
router.use("/", filmographyRoutes);
router.use("/", contributionRoutes);
router.use("/", collaborationRoutes);
router.use("/", faqRoutes);
router.use("/", inquiryRoutes);

export default router;
