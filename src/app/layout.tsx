import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AuthProvider from "@/components/AuthProvider";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "JobAI — AI-Powered Job Matching",
    template: "%s | JobAI",
  },
  description: "JobAI uses Cosine Similarity AI to match candidates with jobs, identify skill gaps, and recommend top companies — personalized for every professional.",
  keywords: ["job matching", "AI recruitment", "skill gap analysis", "resume scoring", "job recommendations"],
  authors: [{ name: "Tasnim Bintey Nayeem" }],
  openGraph: {
    title: "JobAI — AI-Powered Job Matching",
    description: "Stop hunting. Start being hunted. AI-powered career matching for job seekers and employers.",
    type: "website",
    url: "https://job-recommendation-system-delta.vercel.app",
    siteName: "JobAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "JobAI — AI-Powered Job Matching",
    description: "Stop hunting. Start being hunted. AI-powered career matching.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <Toaster richColors position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
