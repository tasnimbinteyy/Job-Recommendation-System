import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/candidates/[id] — get single candidate with applications
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const candidate = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        skills: true,
        experience: true,
        role: true,
        createdAt: true,
        applications: {
          orderBy: { createdAt: "desc" },
          include: {
            job: { select: { id: true, title: true, companyName: true, requiredSkills: true } },
          },
        },
      },
    });

    if (!candidate) {
      return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
    }

    return NextResponse.json({ data: candidate });
  } catch (error) {
    console.error("[GET /api/candidates/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch candidate" }, { status: 500 });
  }
}

// PATCH /api/candidates/[id] — update skills & experience (self or admin)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Only the user themselves can update their own profile
    if (session.user.id !== id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { skills, experience } = body;

    const parsedSkills = Array.isArray(skills)
      ? skills.map((s: string) => s.trim()).filter(Boolean)
      : typeof skills === "string"
      ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : undefined;

    const updated = await db.user.update({
      where: { id },
      data: {
        ...(parsedSkills !== undefined && { skills: parsedSkills }),
        ...(experience !== undefined && { experience: experience.trim() || null }),
      },
      select: { id: true, name: true, skills: true, experience: true },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[PATCH /api/candidates/[id]]", error);
    return NextResponse.json({ error: "Failed to update candidate" }, { status: 500 });
  }
}
