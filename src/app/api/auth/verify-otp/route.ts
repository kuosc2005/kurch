import nodemailer from "nodemailer";
import {verifyUser } from "@/lib/auth/authHelper";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp } = body;

    const success = await verifyUser(email, otp);
    if (!success) {
      return NextResponse.json(
        { message: "Invalid or expired OTP" }, //email not verified
        { status: 400 }
      );
    }

    //email verified and is_verified is set to true in users table
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
