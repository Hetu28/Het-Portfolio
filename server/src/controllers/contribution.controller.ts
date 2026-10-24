import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getContributions(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category } = req.query as { category?: string };

    const where: any = {};
    if (category && category !== "All") {
      where.category = category;
    }

    const films = await prisma.contributionFilm.findMany({
      where,
      orderBy: { sortOrder: "asc" },
      select: {
        seat: true,
        title: true,
        role: true,
        year: true,
        category: true,
      },
    });

    res.status(200).json({
      success: true,
      data: films,
    });
  } catch (error) {
    next(error);
  }
}
