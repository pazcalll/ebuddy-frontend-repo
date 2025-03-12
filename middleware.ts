import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import profile from "./api/profile";

export async function middleware(request: NextRequest) {
  const publicPaths = ["/login", "/sign-up"];

  const token = request.cookies.get("token")?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate");
  requestHeaders.set("Pragma", "no-cache");
  requestHeaders.set("Expires", "0");

  const response = NextResponse.redirect(new URL("/", request.url), {
    headers: requestHeaders,
  });

  if (publicPaths.includes(request.nextUrl.pathname)) {
    if (token) {
      // If the user is authenticated, redirect them away from /login and /sign-up
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Allow access to /login and /sign-up for non-authenticated users
    return NextResponse.next();
  }

  if (!token) {
    // If the user is not authenticated, redirect them to /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    console.log("Checking token");
    const profileData = await profile();
    if (!("uid" in profileData) && "message" in profileData) {
      console.log(profileData);
      response.cookies.delete("token");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.log(error);
    response.cookies.delete("token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  //   return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)"],
};
