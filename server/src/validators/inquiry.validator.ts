import { z } from "zod";

export const inquirySubjects = [
  "Directing & Screenplay",
  "Commercial TVC / Brand Film",
  "Cinematography (DOP)",
  "Color Grading & Post",
  "Music Video Production",
  "General Collaboration",
] as const;

export const createEnquirySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .email("Invalid email address"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone number cannot exceed 30 characters")
    .optional()
    .or(z.literal("")),
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
    .or(z.literal("")),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});
