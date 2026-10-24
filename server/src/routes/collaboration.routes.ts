import { Router } from "express";
import { getCollaborations } from "../controllers/collaboration.controller";

const router = Router();

// GET /api/v1/collaborations
router.get("/collaborations", getCollaborations);

export default router;
