import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const accessToken = request.cookies.get("accessToken")?.value;

    // If no token, redirect to login
    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }


  return NextResponse.next();
}

//Specify which routes to apply this middleware to
export const config = {
  matcher: ["/dashboard"],
};
