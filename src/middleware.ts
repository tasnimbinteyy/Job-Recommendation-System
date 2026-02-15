import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // যদি কাস্টম সাইন-ইন পেজ থাকে তবে সেটি দিন
  },
});

export const config = { 
  matcher: ["/jobs/:path*", "/dashboard/:path*"] 
};