import { z } from "zod";
import { sanitizeText } from "../utils/sanitize";

export const inquirySubjects = [
  "Directing & Screenplay",
  "Commercial TVC / Brand Film",
  "Cinematography (DOP)",
  "Color Grading & Post",
  "Music Video Production",
  "General Collaboration",
] as const;

export const createEnquirySchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .transform(sanitizeText),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Invalid email address")
      .max(254, "Email address is too long"),
    phone: z
      .string()
      .trim()
      .max(30, "Phone number cannot exceed 30 characters")
      .regex(/^[+0-9\s().-]*$/, "Invalid phone number format")
      .optional()
      .or(z.literal(""))
      .transform((val) => (val ? sanitizeText(val) : "")),
    subject: z
      .enum(inquirySubjects, {
        errorMap: () => ({ message: `Subject must be one of: ${inquirySubjects.join(", ")}` }),
      })
      .optional()
      .default("General Collaboration"),
    referral: z
      .string()
      .trim()
      .max(200, "Referral source cannot exceed 200 characters")
      .optional()
      .or(z.literal(""))
      .transform((val) => (val ? sanitizeText(val) : "")),
    message: z
      .string({ required_error: "Message is required" })
      .trim()
      .min(10, "Message must be at least 10 characters")
      .max(5000, "Message cannot exceed 5000 characters")
      .transform(sanitizeText),
  })
  .strict();
