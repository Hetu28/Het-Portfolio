import { Router } from "express";
import { getProjects, getProjectById } from "../controllers/project.controller";
import { validate } from "../middlewares/validate";
import { getProjectsQuerySchema, getProjectParamSchema } from "../validators/project.validator";

const router = Router();

// GET /api/v1/projects
router.get("/projects", validate({ query: getProjectsQuerySchema }), getProjects);

// GET /api/v1/projects/:id
router.get("/projects/:id", validate({ params: getProjectParamSchema }), getProjectById);

export default router;
