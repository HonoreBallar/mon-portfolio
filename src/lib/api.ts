import { cacheLife, cacheTag } from "next/cache";
import { FALLBACK_PORTFOLIO, type Portfolio } from "./data";
import { API_URL } from "./env";

/**
 * Portfolio content managed in the Symfony admin. Cached until the backend
 * calls /api/revalidate after a change.
 */
export async function getPortfolio(): Promise<Portfolio> {
  "use cache";
  cacheTag("portfolio");

  try {
    const res = await fetch(`${API_URL}/api/portfolio`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as Omit<Portfolio, "contactEmail"> & { contactEmail: string | null };

    cacheLife("max");
    return { ...data, contactEmail: data.contactEmail ?? FALLBACK_PORTFOLIO.contactEmail };
  } catch (error) {
    console.error("Portfolio API unavailable, using fallback content:", error);
    // Retry soon rather than keeping the fallback content for long
    cacheLife("minutes");
    return FALLBACK_PORTFOLIO;
  }
}
