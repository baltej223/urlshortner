import { NextResponse } from "next/server";
// import { Hndle } from "@/middleware/redirectionHandler.js"

console.log("middleware runs");

export function middleware(req) {
  // console.log(req.nextUrl.hostname);

  //Hndle(req);

  console.log("Middleware running on:", req.nextUrl.pathname);
  return NextResponse.next(); // Continue to the requested page
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ], // Runs only on routes under /dashboard
};
