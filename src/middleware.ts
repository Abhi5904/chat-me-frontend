import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AppConfig } from "./config/appConfig";

const WithAuthPath = "/chat";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(AppConfig.ACCESS_TOKEN);
  const isRequiredAuth = request?.nextUrl?.pathname?.includes(WithAuthPath);
  if (isRequiredAuth && !token) {
    return NextResponse.redirect(new URL("/", request?.url));
  }
  if (token && !isRequiredAuth) {
    return NextResponse.redirect(new URL("/chat", request?.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|svg).*)",
  ],
};
