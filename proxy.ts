import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 Proxy convention (replaces middleware.ts).
 * Optimistic route boundary for /admin and /account.
 * Full Auth.js v5 session checks will be enforced here and in server actions in Step 3.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  response.headers.set("x-mg-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*", "/checkout/:path*"],
};

