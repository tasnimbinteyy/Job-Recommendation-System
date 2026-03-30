"use client"; 

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/AuthProvider";
import { usePathname } from "next/navigation"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/jobs") || 
                      pathname.startsWith("/profile") || 
                      pathname.startsWith("/settings") ||
                      pathname.startsWith("/overview") || 
                      pathname.startsWith("/browse") ||
                      pathname.startsWith("/dashboard");

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            
            {!isDashboard && <Navbar />}
            <main>{children}</main>      
            {!isDashboard && <Footer />}
            
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}