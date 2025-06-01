import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { doesUserOwnProject } from "@/lib/auth/authHelper";
import { db, project } from "@/db/schema";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: projectId } = await params;

  // THIS REQUIRES user_id and project_id

  try {
    const body = await req.json(); // fields to update
    const userId = body.user_id;

    if (await doesUserOwnProject(userId, projectId)) {
      const updated = await db
        .update(project)
        .set({ ...body, updated_at: new Date() }) // auto-update timestamp
        .where(eq(project.id, projectId))
        .returning();

      return NextResponse.json({ success: true, data: updated[0] });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update project." },
      { status: 500 },
    );
  }
}
