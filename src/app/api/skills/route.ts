import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/skills — fetch all skills (authenticated)
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const skills = await db.skill.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });

    return NextResponse.json({ data: skills });
  } catch (error) {
    console.error("[GET /api/skills]", error);
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

// POST /api/skills — create a new skill (authenticated)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, category } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
    }

    const skill = await db.skill.create({
      data: {
        name: name.trim(),
        category: category?.trim() || "General",
      },
    });

    return NextResponse.json({ data: skill }, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Skill already exists" }, { status: 409 });
    }
    console.error("[POST /api/skills]", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
