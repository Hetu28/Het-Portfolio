import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function getFaqs(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        question: true,
        answer: true,
      },
    });

    res.status(200).json({
      success: true,
      data: faqs,
    });
  } catch (error) {
    next(error);
  }
}
