import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import db from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Read JWT token directly from cookie — works reliably with JWT strategy
    const token = await getToken({
      req,
      secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
      cookieName: process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
    });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();
    if (!["STUDENT", "EMPLOYER"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Get user identifier from token
    const dbId = token.dbId as string | undefined;
    const email = token.email as string | undefined;

    if (!dbId && !email) {
      return NextResponse.json({ error: "Cannot identify user" }, { status: 400 });
    }

    // Update by dbId first, fallback to email
    const where = dbId ? { id: dbId } : { email: email! };

    await db.user.update({
      where,
      data: { role, onboarded: true },
    });

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error("[POST /api/onboarding]", error);
    return NextResponse.json({ error: "Failed to save role" }, { status: 500 });
  }
}
