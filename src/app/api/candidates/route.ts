import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/candidates — list all candidates (EMPLOYER and ADMIN only)
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role === "STUDENT") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const candidates = await db.user.findMany({
      where: { role: "STUDENT" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        skills: true,
        experience: true,
        role: true,
        createdAt: true,
        _count: { select: { applications: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: candidates });
  } catch (error) {
    console.error("[GET /api/candidates]", error);
    return NextResponse.json({ error: "Failed to fetch candidates" }, { status: 500 });
  }
}
