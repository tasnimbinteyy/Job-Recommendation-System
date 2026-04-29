"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isDashboard =
    pathname.startsWith("/jobs") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/overview") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/candidates") ||
    pathname.startsWith("/skills") ||
    pathname.startsWith("/recommendations") ||
    pathname.startsWith("/saved") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/onboarding") ||
    pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      <main>{children}</main>
      {!isDashboard && <Footer />}
    </>
  );
}
