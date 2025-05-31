import { NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/auth/authHelper";
import { isEmailValid } from "@/lib/helper";

export async function POST(req: Request) {
  try {
     const body = await req.json();
     console.log(body);
  const { email, password, username:name } = body;
  

  //check if all fields are provided by user or not
  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 },
    );
  }

  //only allow email from ku domain
  const validEmail: boolean = isEmailValid(email);

  if (!validEmail) {
    return NextResponse.json(
      { message: "Please use university mail" },
      { status: 400 },
    );
  }
  //TODO: verify email before creating user

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

  console.log(newUser);
  if (!newUser) {
    return NextResponse.json(
      { message: "Failed to create user" },
      { status: 500 },
    );
  }


  return NextResponse.json({ message: "User created",data:newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in signUp route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
    
  }
}
