import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin: optimistic check only, pages and actions verify the session with requireAdmin()
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (pathname !== "/admin/login" && !request.cookies.has("admin_session")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.next();
  }

  // The default language lives at the root: /fr is only an internal path
  if (pathname === `/${DEFAULT_LOCALE}`) {
    return NextResponse.redirect(new URL("/", request.url), 308);
  }

  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  // "/" (and any path without a language) is served by the French pages, URL unchanged
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except API routes, Next.js internals and files (favicon.ico, sitemap.xml, robots.txt…)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
