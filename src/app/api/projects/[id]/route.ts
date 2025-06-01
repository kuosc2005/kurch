import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { project } from '@/db/schema';
import { db } from '@/db/schema'

export async function GET(req: NextRequest,
  { params }: { params: { id: string } }) {
  try {
    const project_id = params.id;
    const projects = await db
      .select()
      .where(eq(project.id, project_id))
      .from(project);

    return NextResponse.json({
      success: true,
      data: projects
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ 
      success: false,
      message: 'Failed to fetch projects.'
    }, { status: 500 });
  }
}
