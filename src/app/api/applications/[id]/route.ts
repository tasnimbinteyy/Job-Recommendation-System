import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

const VALID_STATUSES = ["PENDING", "IN_REVIEW", "ACCEPTED", "REJECTED"];

// PATCH /api/applications/[id] — update application status (employer/admin only)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${VALID_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    const application = await db.application.findUnique({
      where: { id },
      include: { job: { select: { employerId: true } } },
    });

    if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });

    // only the job's employer can update status
    if (application.job.employerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await db.application.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[PATCH /api/applications/[id]]", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

// DELETE /api/applications/[id] — withdraw application (applicant only)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const application = await db.application.findUnique({ where: { id } });

    if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    if (application.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.application.delete({ where: { id } });
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/applications/[id]]", error);
    return NextResponse.json({ error: "Failed to withdraw application" }, { status: 500 });
  }
}
