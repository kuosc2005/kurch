import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/schema';
import { getToken } from 'next-auth/jwt';
import { project } from "@/db/project_schema";

// Upload handler for posts
export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.sub) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user_id = token.sub;

  const formData = await req.formData();

  const title = formData.get('title')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  const abstract = formData.get('abstract')?.toString() || '';
  const keywordsRaw = formData.get('keywords')?.toString() || '';
  const visibility = formData.get('visibility')?.toString() || 'private';
  const collaboratorsRaw = formData.getAll('collaborators'); // FormDataEntryValue[]
  const uploadedFiles = formData.getAll('files') as File[];

  const fileNames: string[] = [];

  try {
    for (const file of uploadedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const file_name = `${randomUUID()}-${file.name}`;
      fileNames.push(file_name);

      // Optional: Upload buffer to S3/Supabase here
    }

    // Process keywords into array
    const keywords = keywordsRaw
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0); // string[]

    // Process collaborators into array
    const collaborators = collaboratorsRaw
      .map(c => c.toString().trim())
      .filter(c => c.length > 0); // string[]

    // Insert with proper array values
    await db.insert(project).values({
      user_id,
      title,
      description,
      abstract,
      keywords,
      visibility,
      collaborators,
      uploaded_files: fileNames,
    });
    return NextResponse.json({ message: 'Project created successfully' }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function GET(req: NextRequest) {
  try {
    const projects = await db.select().from(project);
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch projects.' }, { status: 500 });
  }
}
