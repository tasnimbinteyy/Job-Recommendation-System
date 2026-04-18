import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// PUT /api/skills/[id] — update skill
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { name, category } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
    }

    const existing = await db.skill.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    const updated = await db.skill.update({
      where: { id },
      data: {
        name: name.trim(),
        category: category?.trim() || "General",
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Skill name already exists" }, { status: 409 });
    }
    console.error("[PUT /api/skills/[id]]", error);
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

// DELETE /api/skills/[id] — delete skill
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await db.skill.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Skill not found" }, { status: 404 });
    }

    await db.skill.delete({ where: { id } });
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/skills/[id]]", error);
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
