import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/pokemon", "/berries", "/collection"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const isProtected = PROTECTED.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
  const isLogin = pathname === "/login";

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isLogin && token) {
    const url = request.nextUrl.clone();
    url.pathname = "/pokemon";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pokemon/:path*", "/berries/:path*", "/collection/:path*", "/login"],
};
