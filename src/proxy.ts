import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isProtectedRoute = nextUrl.pathname.startsWith("/jobs") ||
                           nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }
})

export const config = {
  matcher: ["/jobs/:path*", "/dashboard/:path*"]
};
