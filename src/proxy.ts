import { NextResponse, type NextRequest } from "next/server";

// Optimistic check only: pages and actions verify the session with requireAdmin()
export function proxy(request: NextRequest) {
  if (!request.cookies.has("admin_session")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/((?!login).*)"],
};
