import { Project } from "@/data/projects";
import { FilmographyGroup } from "@/data/filmography";
import { ContributionFilm, FreelanceProject } from "@/data/experience";
import { FAQItem } from "@/data/faq";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") || "http://localhost:5000";

const DEFAULT_TIMEOUT_MS = 6000;

/**
 * Robust fetch wrapper with timeout
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return res;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export interface EnquiryInput {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  referral?: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message?: string;
  inquiryId?: string;
  error?: string;
}

/**
 * Submit an enquiry to the REST API
 */
export async function submitEnquiry(input: EnquiryInput): Promise<EnquiryResponse> {
  try {
    const res = await fetchWithTimeout(
      `${API_BASE_URL}/api/v1/enquiries`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      },
      8000
    );

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      if (res.status === 429) {
        return {
          success: false,
          error: "Too many requests. Please wait a few minutes before submitting another inquiry.",
        };
      }
      if (json && json.error) {
        if (Array.isArray(json.error.details) && json.error.details.length > 0) {
          const detailMessages = json.error.details.map((d: any) => d.message).join(". ");
          return { success: false, error: detailMessages || json.error.message };
        }
        return { success: false, error: json.error.message || "Failed to submit inquiry." };
      }
      return { success: false, error: `Server returned error (${res.status}). Please try again.` };
    }

    return {
      success: true,
      message: json?.data?.message || "Inquiry received successfully.",
      inquiryId: json?.data?.inquiryId,
    };
  } catch (err: any) {
    if (err?.name === "AbortError") {
      return { success: false, error: "Network timeout. Please check your connection and try again." };
    }
    return {
      success: false,
      error: "Unable to connect to the server. Please check your network or try again shortly.",
    };
  }
}

/**
 * Fetch projects from the backend API with optional filtering
 */
export async function fetchProjects(params?: {
  featured?: boolean;
  category?: string;
}): Promise<Project[] | null> {
  try {
    const query = new URLSearchParams();
    if (params?.featured !== undefined) query.set("featured", String(params.featured));
    if (params?.category && params.category !== "all") query.set("category", params.category);

    const qs = query.toString() ? `?${query.toString()}` : "";
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/v1/projects${qs}`);
    if (!res.ok) return null;

    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return json.data as Project[];
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch single project with case study stills & technical specs
 */
export async function fetchProjectById(id: string): Promise<Project | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/v1/projects/${encodeURIComponent(id)}`);
    if (!res.ok) return null;

    const json = await res.json();
    if (json?.success && json.data) {
      return json.data as Project;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch filmography credits grouped by role
 */
export async function fetchFilmography(): Promise<FilmographyGroup[] | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/v1/filmography`);
    if (!res.ok) return null;

    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return json.data as FilmographyGroup[];
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch on-set contribution cinema seats
 */
export async function fetchContributions(category?: string): Promise<ContributionFilm[] | null> {
  try {
    const query = category && category !== "All" ? `?category=${encodeURIComponent(category)}` : "";
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/v1/contributions${query}`);
    if (!res.ok) return null;

    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return json.data as ContributionFilm[];
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch freelance and brand collaborations
 */
export async function fetchCollaborations(): Promise<{
  freelance: FreelanceProject[];
  brands: any[];
} | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/v1/collaborations`);
    if (!res.ok) return null;

    const json = await res.json();
    if (json?.success && json.data) {
      return json.data;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch FAQs
 */
export async function fetchFaqs(): Promise<FAQItem[] | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE_URL}/api/v1/faqs`);
    if (!res.ok) return null;

    const json = await res.json();
    if (json?.success && Array.isArray(json.data)) {
      return json.data as FAQItem[];
    }
    return null;
  } catch {
    return null;
  }
}
