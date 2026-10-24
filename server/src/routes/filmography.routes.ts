import { Router } from "express";
import { getFilmography } from "../controllers/filmography.controller";

const router = Router();

// GET /api/v1/filmography
router.get("/filmography", getFilmography);

export default router;
