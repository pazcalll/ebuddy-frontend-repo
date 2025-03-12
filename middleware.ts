import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import profile from "./api/profile";

export async function middleware(request: NextRequest) {
  const protectedRoutes = ["/"];
  const token = request.cookies.get("token")?.value;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Cache-Control", "no-store, no-cache, must-revalidate");
  requestHeaders.set("Pragma", "no-cache");
  requestHeaders.set("Expires", "0");

  const response = NextResponse.redirect(new URL("/login", request.url), {
    headers: requestHeaders,
  });

  const url = request.url.split(request.nextUrl.origin);
  // console.log(url);

  if (protectedRoutes.includes(url[1])) {
    if (!token) {
      console.log("no token");
      return response;
    }
    try {
      const firebaseUserProfile = await profile();
      console.log(firebaseUserProfile);
      if ("message" in firebaseUserProfile && !("uid" in firebaseUserProfile))
        throw new Error(firebaseUserProfile.message);
    } catch (error) {
      response.cookies.delete("token");
      return response;
    }
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
