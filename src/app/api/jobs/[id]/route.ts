import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// GET /api/jobs/[id]
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const job = await db.job.findUnique({
      where: { id },
      include: {
        employer: { select: { name: true, image: true } },
        _count: { select: { applications: true } },
      },
    });

    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    return NextResponse.json({ data: job });
  } catch (error) {
    console.error("[GET /api/jobs/[id]]", error);
    return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
  }
}

// PUT /api/jobs/[id] — update job (owner only)
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await db.job.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    if (existing.employerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, companyName, location, salaryRange, requiredSkills } = body;

    if (!title || !description || !companyName || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updated = await db.job.update({
      where: { id },
      data: {
        title: title.trim(),
        description: description.trim(),
        companyName: companyName.trim(),
        location: location.trim(),
        salaryRange: salaryRange?.trim() || null,
        requiredSkills: Array.isArray(requiredSkills)
          ? requiredSkills
          : requiredSkills?.split(",").map((s: string) => s.trim()).filter(Boolean) || [],
      },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[PUT /api/jobs/[id]]", error);
    return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
  }
}

// DELETE /api/jobs/[id] — delete job (owner only)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const existing = await db.job.findUnique({ where: { id } });
    if (!existing) return NextResponse.json({ error: "Job not found" }, { status: 404 });
    if (existing.employerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // delete related applications first to avoid FK constraint
    await db.application.deleteMany({ where: { jobId: id } });
    await db.job.delete({ where: { id } });

    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/jobs/[id]]", error);
    return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
  }
}
