import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { project } from '@/db/schema/project_schema';
import { eq } from 'drizzle-orm';
import { doesUserOwnProject } from '@/lib/auth/authHelper';

export async function PATCH( // update the project info
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  const projectId = params.id;

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
      { success: false, message: 'Failed to update project.' },
      { status: 500 }
    );
  }
}
