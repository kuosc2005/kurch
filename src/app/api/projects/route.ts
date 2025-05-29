import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/schema';
import { getToken } from 'next-auth/jwt';


export async function POST(req: Request) {


  const token = getToken({ req, secret: process.env.JWT_SECRET })

  const formData = await req.formData();

  const title = formData.get('title')?.toString() || '';
  const description = formData.get('description')?.toString() || '';
  const abstract = formData.get('abstract')?.toString() || '';
  const keywords = formData.get('keywords')?.toString() || '';
  const visibility = formData.get('visibility')?.toString() || 'private';
  const collaborators = formData.get('collaborators') || [];
  const uploadedFiles = formData.getAll('files') as File[]; // multiple files

  const fileNames: string[] = [];

  try {
    for (const file of uploadedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const file_name = `${randomUUID()}-${file.name}`;
      fileNames.push(file_name);
    }
    const newProject = await db.insert(project).values({
      user_id: //Token_value ,
      title,
      description,
      abstract,
      keywords,
      visibility,
      collaborators,
      uploaded_files: fileNames.join(','),
    })
    return NextResponse.json({ message: 'Project created successfully' }, { status: 201 });
  }
  catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }



}
