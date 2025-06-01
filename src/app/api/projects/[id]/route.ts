import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { project, projectCollaborators } from "@/db/schema";
import { db } from "@/db/schema";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: project_id } = await params;

    const projects = await db
      .select()
      .from(project)
      .where(eq(project.id, project_id));

    const collaborators = await db
      .select({
        id: projectCollaborators.id,
        name: projectCollaborators.name,
        role: projectCollaborators.role,
        email: projectCollaborators.email,
      })
      .from(projectCollaborators)
      .where(eq(projectCollaborators.project_id, project_id))
      .limit(1);

    const tags = JSON.parse(projects[0].tags);
    const technologies = JSON.parse(projects[0].technologies);
    const categories = JSON.parse(projects[0].categories);
    const formattedData = { ...projects[0], tags, technologies, categories };

    return NextResponse.json(
      {
        ...formattedData,
        collaborators,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch project.",
      },
      { status: 500 },
    );
  }
}
