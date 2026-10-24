import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getCollaborations(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { type = "all" } = req.query as { type?: string };

    let freelanceData: any[] = [];
    let brandsData: any[] = [];

    if (type === "all" || type === "freelance") {
      const freelance = await prisma.freelanceProject.findMany({
        orderBy: { sortOrder: "asc" },
        include: {
          roles: {
            orderBy: { sortOrder: "asc" },
            select: { role: true },
          },
        },
      });

      freelanceData = freelance.map((f) => ({
        title: f.title,
        category: f.category,
        roles: f.roles.map((r) => r.role),
      }));

      if (type === "freelance") {
        res.status(200).json({ success: true, data: freelanceData });
        return;
      }
    }

    if (type === "all" || type === "brands") {
      const brands = await prisma.brandCollaboration.findMany({
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          name: true,
          role: true,
          year: true,
          category: true,
          logo: true,
          extra: true,
        },
      });

      brandsData = brands.map((b) => ({
        ...b,
        extra: b.extra || undefined,
      }));

      if (type === "brands") {
        res.status(200).json({ success: true, data: brandsData });
        return;
      }
    }

    res.status(200).json({
      success: true,
      data: {
        freelance: freelanceData,
        brands: brandsData,
      },
    });
  } catch (error) {
    next(error);
  }
}
