import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getFilmography(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const groups = await prisma.filmographyGroup.findMany({
      orderBy: { sortOrder: "asc" },
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
          select: {
            title: true,
            meta: true,
          },
        },
      },
    });

    const formatted = groups.map((g) => ({
      role: g.role,
      subtitle: g.subtitle || undefined,
      items: g.items,
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    next(error);
  }
}
