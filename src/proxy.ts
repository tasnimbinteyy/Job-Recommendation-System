import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  const role = req.auth?.user?.role;
  const onboarded = req.auth?.user?.onboarded;

  // Admin-only routes
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) return Response.redirect(new URL("/api/auth/signin", nextUrl));
    if (role !== "ADMIN") return Response.redirect(new URL("/overview", nextUrl));
    return;
  }

  // Already onboarded users trying to access /onboarding → redirect to dashboard
  if (pathname === "/onboarding" && isLoggedIn && onboarded) {
    const redirectTo = role === "EMPLOYER" ? "/jobs" : role === "ADMIN" ? "/admin" : "/overview";
    return Response.redirect(new URL(redirectTo, nextUrl));
  }

  const isProtectedRoute =
    pathname.startsWith("/jobs") ||
    pathname.startsWith("/overview") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/candidates") ||
    pathname.startsWith("/skills") ||
    pathname.startsWith("/recommendations") ||
    pathname.startsWith("/saved");

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL("/api/auth/signin", nextUrl));
  }

  // ADMIN — redirect to /admin only if they try to access non-admin protected routes
  // (but allow /jobs, /applications, /candidates, /skills, /settings for admin use)
  if (isLoggedIn && role === "ADMIN" && isProtectedRoute) {
    const adminAllowed =
      pathname.startsWith("/jobs") ||
      pathname.startsWith("/applications") ||
      pathname.startsWith("/candidates") ||
      pathname.startsWith("/skills") ||
      pathname.startsWith("/settings");
    if (!adminAllowed) {
      return Response.redirect(new URL("/admin", nextUrl));
    }
    return;
  }

  // Redirect logged-in but not onboarded users to onboarding
  // (skip if already on onboarding page or api routes)
  if ( isLoggedIn && !onboarded && role !== "ADMIN" &&!pathname.startsWith("/onboarding") &&
    !pathname.startsWith("/api") && isProtectedRoute) 
    {
    return Response.redirect(new URL("/onboarding", nextUrl));
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
    "/saved/:path*",
    "/admin/:path*",
    "/onboarding",
  ],
};
