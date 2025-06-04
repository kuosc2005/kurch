import { NextResponse } from "next/server";
import { generateOtp, saveOTPForUser } from "@/lib/auth/authHelper";
import { sendOTPEmail } from "@/lib/helper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const otp = generateOtp();
    const result = await sendOTPEmail({ to: email, otp });

    if (!result.success) {
      console.error("Failed to send OTP email:", result.error);
      return NextResponse.json(
        { message: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    await saveOTPForUser(email, otp);

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in resend-otp route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 