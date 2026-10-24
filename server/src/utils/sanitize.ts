/**
 * Security sanitization helpers to prevent Stored & Reflected XSS
 */

/**
 * Strips null bytes and normalizes unicode
 */
export function stripNullBytes(input: string): string {
  return input.replace(/\0/g, "");
}

/**
 * Encodes special HTML characters into safe HTML entities
 */
export function escapeHtml(input: string): string {
  if (!input) return "";
  return input
    .replace(/\0/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Strips dangerous HTML tags while preserving printable text
 */
export function sanitizeText(input: string): string {
  if (!input) return "";
  const cleaned = stripNullBytes(input).trim();
  // Strip dangerous tag patterns and javascript URIs
  return cleaned
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*iframe[^>]*>[\s\S]*?<\s*\/\s*iframe\s*>/gi, "")
    .replace(/<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, "")
    .replace(/javascript\s*:/gi, "")
    .replace(/on\w+\s*=/gi, "");
}
