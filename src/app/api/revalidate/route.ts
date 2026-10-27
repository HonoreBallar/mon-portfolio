import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";

function isValidSecret(given: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;

  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Called by the Symfony backend after each change made in the admin */
export async function POST(request: Request) {
  if (!isValidSecret(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  // expire: 0 → the next visitor gets the new content, not a stale copy
  revalidateTag("portfolio", { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
