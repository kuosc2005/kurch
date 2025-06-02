import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getUserProfileData } from "@/lib/helper";
import { db, userProfile } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    console.log(token);

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = (await params).id;

    const profile = await getUserProfileData(userId);

    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const userId = (await params).id;

    //only user can update their profile
    if (token.id !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();

    const {
      title,
      department,
      bio,
      website,
      orcid_id,
      google_scholar,
      education,
      location,
      research_interests,
    } = body;

    // userProfile ==exists? update:create
    const existingProfile = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.user_id, userId));

    if (existingProfile.length > 0) {
      //userProfile exists,only update defined fields
      await db
        .update(userProfile)
        .set({
          ...(title !== undefined && { title }),
          ...(department !== undefined && { department }),
          ...(bio !== undefined && { bio }),
          ...(education !== undefined && { education }),
          ...(location !== undefined && { location }),
          ...(website !== undefined && { website }),
          ...(orcid_id !== undefined && { orcid_id }),
          ...(google_scholar !== undefined && { google_scholar }),
          ...(research_interests !== undefined && { research_interests }),
          updated_at: new Date(),
        })
        .where(eq(userProfile.user_id, userId));
    } else {
      //doesn't exist, so create userProfile table according to passed values
      await db.insert(userProfile).values({
        user_id: userId,
        title: title || null, // null values if not provided in post request
        department: department || null,
        bio: bio || null,
        website: website || null,
        education: education || null,
        location: location || null,
        orcid_id: orcid_id || null,
        google_scholar: google_scholar || null,
        research_interests: research_interests || null,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating profile:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
