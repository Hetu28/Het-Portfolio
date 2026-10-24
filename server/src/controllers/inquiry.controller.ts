import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/db";

export async function createEnquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, email, phone, subject, referral, message } = req.body;

    const ipAddress = req.ip || req.socket.remoteAddress || null;
    const userAgent = req.get("user-agent") || null;

    const newInquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: subject || "General Collaboration",
        referral: referral ? referral.trim() : null,
        message: message.trim(),
        status: "UNREAD",
        ipAddress,
        userAgent,
      },
    });

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Your inquiry has been received. I will review your project and get back to you within 24 hours.",
      data: {
        inquiryId: newInquiry.id,
        createdAt: newInquiry.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}
