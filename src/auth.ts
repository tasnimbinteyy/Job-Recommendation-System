import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.dbId as string) ?? "";
        session.user.role = (token.role as "STUDENT" | "EMPLOYER" | "ADMIN") ?? "STUDENT";
        session.user.onboarded = (token.onboarded as boolean) ?? false;
      }
      return session;
    },

    async jwt({ token, user }) {
      // First sign-in — user object is present
      if (user?.email) {
        try {
          const dbUser = await db.user.findUnique({
            where: { email: user.email },
            select: { id: true, role: true, onboarded: true },
          });
          if (dbUser) {
            token.dbId = dbUser.id;
            token.role = dbUser.role;
            token.onboarded = dbUser.onboarded;
          }
        } catch {}
        return token;
      }

      // Always re-check DB on token refresh so role changes take effect
      // without requiring the user to sign out
      if (token.dbId) {
        try {
          const dbUser = await db.user.findUnique({
            where: { id: token.dbId as string },
            select: { role: true, onboarded: true },
          });
          if (dbUser) {
            token.role = dbUser.role;
            token.onboarded = dbUser.onboarded;
          }
        } catch {}
      }

      return token;
    },
  },

  debug: false,
})
