import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { eq } from "drizzle-orm";
import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/db/schema";
import { users } from "@/db/user_schema";
import { NextRequest, NextResponse } from "next/server";
import { isStrongPassword } from "@/lib/helper";
import { getUserByEmail, retrievePasswordHash } from "@/lib/auth/authHelper";
import bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token || !token.email) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 },
    );
  }

  const body = await req.json();
  const { newPassword, currentPassword } = body;
  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  //check if user provided same password
  if (newPassword === currentPassword) {
    return NextResponse.json(
      { message: "Your new password cannot be same as old password" },
      { status: 400 },
    );
  }

  if (!isStrongPassword(newPassword)) {
    return NextResponse.json(
      {
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      },
      { status: 400 },
    );
  }

  try {
    //check if user exists

    const userRecord = await getUserByEmail(token.email);

    if (!userRecord) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    //find a way to extract hash password of user to verify if current password matches
    const userPasswordObj = await retrievePasswordHash(userRecord.email);
    if (!userPasswordObj || !userPasswordObj.password) {
      return NextResponse.json(
        { message: "User has no password set" },
        { status: 404 },
      );
    }
    //compare stored hash pass with current password of user to verify if current password is correct
    const isMatch = await bcrypt.compare(
      currentPassword,
      userPasswordObj.password,
    );

    if (!isMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 401 },
      );
    }

    //only hash the password if current password provided by user is correct
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    //update in db
    await db
      .update(users)
      .set({ password_hash: hashedPassword })
      .where(eq(users.email, token.email));

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Update password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
