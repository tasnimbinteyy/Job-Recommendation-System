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
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (!token.sub) return token;

      let dbUser = await db.user.findUnique({
        where: { id: token.sub },
      });

      if (!dbUser && user?.email) {
        dbUser = await db.user.upsert({
          where: { email: user.email },
          update: {},
          create: {
            id: token.sub,
            name: user.name,
            email: user.email,
            image: user.image,
          },
        });
      }

      if (dbUser) {
        token.role = dbUser.role;
      }

      return token;
    },
  },

  debug: process.env.NODE_ENV === "development",
})
