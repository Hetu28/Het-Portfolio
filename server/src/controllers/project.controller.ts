import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";
import { NotFoundError } from "../errors/AppError";

function formatProject(p: any) {
  return {
    id: p.id,
    title: p.title,
    category: p.category,
    categories: p.categories ? p.categories.map((c: any) => c.category) : [],
    role: p.role,
    year: p.year,
    duration: p.duration,
    image: p.image,
    videoUrl: p.videoUrl,
    synopsis: p.synopsis,
    client: p.client,
    type: p.type,
    behanceUrl: p.behanceUrl,
    featured: p.featured,
    deliverables: p.deliverables ? p.deliverables.map((d: any) => d.name) : [],
    stills: p.stills
      ? p.stills.map((s: any) => ({
          id: s.id,
          url: s.url,
          title: s.title,
          caption: s.caption,
          lighting: s.lighting,
          aspect: s.aspect,
        }))
      : [],
    technicalSpecs: p.technicalSpecs
      ? {
          camera: p.technicalSpecs.camera,
          lens: p.technicalSpecs.lens,
          aspectRatio: p.technicalSpecs.aspectRatio,
          colorGrading: p.technicalSpecs.colorGrading,
          lightingStyle: p.technicalSpecs.lightingStyle,
          location: p.technicalSpecs.location,
        }
      : null,
  };
}

export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, featured, page = 1, limit = 20 } = req.query as any;

    const where: any = {};

    if (featured !== undefined) {
      where.featured = featured;
    }

    if (category && category !== "all") {
      where.categories = {
        some: {
          category: {
            equals: category,
          },
        },
      };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [total, projects] = await prisma.$transaction([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        skip,
        take,
        orderBy: { sortOrder: "asc" },
        include: {
          categories: true,
          deliverables: { orderBy: { sortOrder: "asc" } },
          stills: { orderBy: { sortOrder: "asc" } },
          technicalSpecs: true,
        },
      }),
    ]);

    res.status(200).json({
      success: true,
      data: projects.map(formatProject),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / take) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProjectById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        categories: true,
        deliverables: { orderBy: { sortOrder: "asc" } },
        stills: { orderBy: { sortOrder: "asc" } },
        technicalSpecs: true,
      },
    });

    if (!project) {
      throw new NotFoundError(`Project with ID '${id}' not found`);
    }

    res.status(200).json({
      success: true,
      data: formatProject(project),
    });
  } catch (error) {
    next(error);
  }
}
