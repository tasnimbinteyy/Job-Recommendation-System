import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") return null;
  return session;
}

export async function GET() {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        onboarded: true,
        createdAt: true,
        _count: { select: { applications: true, jobsPosted: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: users });
  } catch (error) {
    console.error("[GET /api/admin/users]", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const { userId, role } = await req.json();
    if (!userId || !["STUDENT", "EMPLOYER", "ADMIN"].includes(role)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Prevent admin from demoting themselves
    if (userId === session.user.id) {
      return NextResponse.json({ error: "You cannot change your own role" }, { status: 403 });
    }

    const updated = await db.user.update({
      where: { id: userId },
      data: { role },
      select: { id: true, name: true, role: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[PATCH /api/admin/users]", error);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}
