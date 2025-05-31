import { NextResponse } from "next/server";
import { createUser, generateOtp, getUserByEmail, saveOTPForUser } from "@/lib/auth/authHelper";
import { isEmailValid, sendOTPEmail } from "@/lib/helper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username:name } = body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Only allow email from ku domain
    const validEmail: boolean = isEmailValid(email);
    if (!validEmail) {
      return NextResponse.json(
        { message: "Please use university mail" },
        { status: 400 },
      );
    }


    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }



    const newUser = await createUser({
      name,
      email,
      password,
      
    });
  
  if (!newUser) {
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }


    

  const otp : string  = generateOtp(); 
  const result = await sendOTPEmail({ to: email, otp })

   
    if (!result.success) {
      console.error("Failed to send OTP email:", result.error);
      return NextResponse.json(
        { message: "User created, but failed to send OTP email" },
        { status: 500 },
      );
    }
    //otp sent 
    await saveOTPForUser(email, otp);


    return NextResponse.json(
      { message: "User created. OTP sent to your email." },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in signUp route::", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

