import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

// PATCH /api/notifications/[id] — mark single notification as read
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Ensure the notification belongs to the current user
    const notification = await db.notification.findUnique({ where: { id } });
    if (!notification) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    if (notification.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.notification.update({
      where: { id },
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PATCH /api/notifications/[id]]", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
