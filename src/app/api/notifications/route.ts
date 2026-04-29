import { NextResponse } from "next/server";
import { auth } from "@/auth";
import db from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const notifications = await db.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const unreadCount = notifications.filter((n) => !n.read).length;
    return NextResponse.json({ data: notifications, unreadCount });
  } catch (error) {
    console.error("[GET /api/notifications]", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// Mark all as read
export async function PATCH() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await db.notification.updateMany({
      where: { userId: session.user.id, read: false },
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[PATCH /api/notifications]", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
