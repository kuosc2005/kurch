import { NextRequest, NextResponse } from "next/server";
import { db, project, projectCollaborators } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    // Get all projects where user is owner
    const ownedProjects = await db
      .select({
        id: project.id,
        title: project.title,
        user_id: project.user_id,
        description: project.description,
        tags: project.tags,
        categories: project.categories,
        technologies: project.technologies,
        updated_at: project.updated_at,
        semester: project.semester,
        field_of_study: project.field_of_study,
      })
      .from(project)
      .where(eq(project.user_id, userId));

    // Get all project IDs where user is a collaborator
    const collaboratorProjectIds = await db
      .select({ project_id: projectCollaborators.project_id })
      .from(projectCollaborators)
      .where(eq(projectCollaborators.user_id, userId));

    // Get projects where user is collaborator
    let collaboratorProjects: {
      id: string;
      title: string;
      user_id: string;
      description: string;
      tags: string;
      categories: string;
      technologies: string;
      updated_at: Date | null;
      semester: string;
      field_of_study: string;
    }[] = [];
    if (collaboratorProjectIds.length > 0) {
      const projectIds = collaboratorProjectIds.map((p) => p.project_id);

      collaboratorProjects = await db
        .select({
          id: project.id,
          title: project.title,
          user_id: project.user_id,
          description: project.description,
          tags: project.tags,
          categories: project.categories,
          technologies: project.technologies,
          updated_at: project.updated_at,
          semester: project.semester,
          field_of_study: project.field_of_study,
        })
        .from(project)
        .where(or(...projectIds.map((id) => eq(project.id, id))));
    }

    // Combine and deduplicate projects
    const allProjects = [...ownedProjects, ...collaboratorProjects];
    const uniqueProjects = allProjects.filter(
      (project, index, self) =>
        index === self.findIndex((p) => p.id === project.id)
    );

    // Parse JSON fields and add collaborators
    const projectsWithCollaborators = await Promise.all(
      uniqueProjects.map(async (proj) => {
        const tags = JSON.parse(proj.tags);
        const categories = JSON.parse(proj.categories);
        const technologies = JSON.parse(proj.technologies);

        const collaborators = await db
          .select()
          .from(projectCollaborators)
          .where(eq(projectCollaborators.project_id, proj.id));

        return {
          ...proj,
          tags,
          categories,
          technologies,
          collaborators: collaborators || [],
        };
      })
    );

    return NextResponse.json(projectsWithCollaborators);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}
