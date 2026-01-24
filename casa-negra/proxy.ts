import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const intlResponse = intlMiddleware(request);
  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};