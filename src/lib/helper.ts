import { db, userProfile, users } from "@/db/schema";
import { ProfileData } from "@/types/profile";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@(student\.ku\.edu\.np|ku\.edu\.np)$/;
  return emailRegex.test(email);
}

export function isStrongPassword(password: string): boolean {
  const minLength = 8;
  if (password.length < minLength) return false;

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
}

//send email:

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendOTPEmailParams {
  to: string;

  otp: string;
}

export async function sendOTPEmail({
  to,

  otp,
}: SendOTPEmailParams) {
  const mailOptions = {
    from: `"KURCH" <${process.env.SMTP_USER}>`,
    to,
    subject: "KURCH - Email Verification OTP",
    text: `
KURCH - Email Verification

Dear ${to},

To complete your registration, please verify your email using the following OTP:

${otp}

This OTP is valid for 5 minutes. Please do not share it with anyone.

If you did not request this, please ignore this email.

For assistance, contact kucc@ku.edu.np

© 2025 KURCH. All rights reserved.
	`.trim(),
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending OTP email:", error);
    return { success: false, error };
  }
}


export async function getUserProfileData(
  userId: string,
): Promise<ProfileData | null> {
  try {
    const results = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        title: userProfile.title,
        bio: userProfile.bio,
        department: userProfile.department,
        research_interests: userProfile.research_interests,
      })
      .from(users)
      .leftJoin(userProfile, eq(users.id, userProfile.user_id))
      .where(eq(users.id, userId));

    const row = results[0];
    if (!row) return null;

    const researchInterests = row.research_interests
      ? row.research_interests.split(',').map((s) => s.trim())
      : [];

    const profileData: ProfileData = {
      name: row.name || "User",
      email: row.email,
      title: row.title || "",
      university: "Kathmandu University",
      location: "",
      education: "",
      bio: row.bio || "",
      researchInterests,
      publications: [],
      department: row.department || "",
    };

    return profileData;
  } catch (err) {
    console.error("Error fetching joined user profile:", err);
    return null;
  }
}

