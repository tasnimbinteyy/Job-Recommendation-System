import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

const VALID_STATUSES = ["PENDING", "IN_REVIEW", "ACCEPTED", "REJECTED"];

const STATUS_MESSAGES: Record<string, { title: string; message: string }> = {
  IN_REVIEW: {
    title: "Application Under Review",
    message: "Your application is being reviewed by the employer.",
  },
  ACCEPTED: {
    title: "🎉 Application Accepted!",
    message: "Congratulations! Your application has been accepted.",
  },
  REJECTED: {
    title: "Application Update",
    message: "Your application was not selected this time. Keep applying!",
  },
};

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const { status } = await req.json();

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Status must be one of: ${VALID_STATUSES.join(", ")}` }, { status: 400 });
    }

    const application = await db.application.findUnique({
      where: { id },
      include: { job: { select: { employerId: true, title: true, companyName: true } } },
    });

    if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });

    // Admin can update any application; employer can only update their own jobs'
    if (session.user.role !== "ADMIN" && application.job.employerId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updated = await db.application.update({ where: { id }, data: { status } });

    // Create notification for the student
    const notifContent = STATUS_MESSAGES[status];
    if (notifContent) {
      await db.notification.create({
        data: {
          userId: application.userId,
          title: notifContent.title,
          message: `${notifContent.message} — ${application.job.title} at ${application.job.companyName}`,
          link: "/applications",
        },
      });
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("[PATCH /api/applications/[id]]", error);
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const application = await db.application.findUnique({ where: { id } });

    if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    if (application.userId !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await db.application.delete({ where: { id } });
    return NextResponse.json({ data: { success: true } });
  } catch (error) {
    console.error("[DELETE /api/applications/[id]]", error);
    return NextResponse.json({ error: "Failed to withdraw application" }, { status: 500 });
  }
}
