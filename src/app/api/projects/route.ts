import { NextRequest, NextResponse } from "next/server";
import { db, projectCollaborators, users } from "@/db/schema";
import { getToken } from "next-auth/jwt";
import { project } from "@/db/project_schema";
import { eq } from "drizzle-orm";
import { getAllProjects } from "@/lib/helper";
// Upload handler for posts
// export async function POST(req: NextRequest) {
//   const token = await getToken({ req });

//   if (!token || !token.sub) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user_id = token.sub;

//   const formData = await req.formData();

//   const title = formData.get("title")?.toString() || "";
//   const description = formData.get("description")?.toString() || "";
//   const abstract = formData.get("abstract")?.toString() || "";
//   const keywordsRaw = formData.get("keywords")?.toString() || "";
//   const visibility = formData.get("visibility")?.toString() || "private";
//   const collaboratorsRaw = formData.getAll("collaborators"); // FormDataEntryValue[]
//   const uploadedFiles = formData.getAll("files") as File[];

//   const fileNames: string[] = [];

//   try {
//     for (const file of uploadedFiles) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const file_name = `${randomUUID()}-${file.name}`;
//       fileNames.push(file_name);

//       // Optional: Upload buffer to S3/Supabase here
//     }

//     // Process keywords into array
//     const keywords = keywordsRaw
//       .split(",")
//       .map((k) => k.trim())
//       .filter((k) => k.length > 0); // string[]

//     // Process collaborators into array
//     const collaborators = collaboratorsRaw
//       .map((c) => c.toString().trim())
//       .filter((c) => c.length > 0); // string[]

//     // Insert with proper array values
//     await db.insert(project).values({
//       user_id,
//       title,
//       description,
//       abstract,
//       keywords,
//       visibility,
//       collaborators,
//       uploaded_files: fileNames,
//     });
//     return NextResponse.json(
//       { message: "Project created successfully" },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(req: NextRequest) {
  try {
    const projects = await getAllProjects();
    if (projects == null) return NextResponse.json([]);

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user_id = req.headers.get("x-user-id");
    if (!user_id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const {
      title,
      description,
      abstract,
      tags,
      semester,
      fieldOfStudy,
      technologies,
      categories,
      collaborators,
      github_link,
      report_link,
    } = data;

    if (
      !title ||
      !github_link ||
      !report_link ||
      !description ||
      !abstract ||
      !tags ||
      !semester ||
      !fieldOfStudy ||
      !technologies ||
      !categories ||
      !Array.isArray(collaborators)
    ) {
      return NextResponse.json(
        { success: false, message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Insert project and get inserted record with ID
    const [insertedProject] = await db
      .insert(project)
      .values({
        user_id,
        title,
        description,
        github_link,
        report_link,
        abstract,
        tags: JSON.stringify(tags),
        semester,
        field_of_study: fieldOfStudy,
        technologies: JSON.stringify(technologies),
        categories: JSON.stringify(categories),
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning();

    // Process collaborators - check if they exist in users table
    if (collaborators.length > 0) {
      const collaboratorsToInsert = await Promise.all(
        collaborators.map(async (c: any) => {
          let collaborator_user_id = null;

          // Check if user exists by email
          if (c.email) {
            const existingUser = await db
              .select({ id: users.id })
              .from(users)
              .where(eq(users.email, c.email))
              .limit(1);

            if (existingUser.length > 0) {
              collaborator_user_id = existingUser[0].id;
            } else {
              // Generate random UUID if user doesn't exist
              collaborator_user_id = null;
            }
          } else {
            // Generate random UUID if no email provided
            collaborator_user_id = null;
          }

          return {
            project_id: insertedProject.id,
            user_id: collaborator_user_id,
            name: c.name,
            role: c.role,
            email: c.email,
          };
        })
      );

      await db.insert(projectCollaborators).values(collaboratorsToInsert);
    }

    return NextResponse.json(
      { success: true, data: insertedProject },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project with collaborators:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}
