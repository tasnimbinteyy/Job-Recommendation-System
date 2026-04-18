import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isProtectedRoute =
    nextUrl.pathname.startsWith("/jobs") ||
    nextUrl.pathname.startsWith("/overview") ||
    nextUrl.pathname.startsWith("/profile") ||
    nextUrl.pathname.startsWith("/settings") ||
    nextUrl.pathname.startsWith("/applications") ||
    nextUrl.pathname.startsWith("/candidates") ||
    nextUrl.pathname.startsWith("/skills") ||
    nextUrl.pathname.startsWith("/recommendations");

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }
});

export const config = {
  matcher: [
    "/jobs/:path*",
    "/overview/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/applications/:path*",
    "/candidates/:path*",
    "/skills/:path*",
    "/recommendations/:path*",
  ],
};
