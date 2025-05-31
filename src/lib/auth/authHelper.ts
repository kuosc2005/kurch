import { eq } from "drizzle-orm";
import { db } from "@/db/schema";
import {users} from "@/db/schema"
import bcrypt from "bcrypt";

interface User {
  id: string;
  name: string;
  email: string;
  profile_pic?: string | null;
  role?: "user" | "admin";
  provider?: "credentials" | "google";
  createdAt?: Date;
}
interface CreateUserData {
  name: string;
  email: string;
  password: string | null;
  profile_pic?: string | null;
  created_at?: Date;
  role?: "user" | "admin";
}

interface GoogleSignInData {
  email: string;
  name: string;
  image: string | null;
  googleId: string;
}

interface GoogleSignInResult {
  success: boolean;
  user?: User;
  error?: string;
}

// Custom error class for authentication errors
export class AuthError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const validateUserCredentials = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    // Input validation
    if (!email || !password) {
      console.log("Missing email or password");
      throw new AuthError('MISSING_CREDENTIALS', 'Email and password are required');
    }

    console.log("Attempting to validate credentials for:", email);
    
    const result = await db.select().from(users).where(eq(users.email, email));

  

    if (result.length === 0) {
      console.log("No user found with email:", email);
      throw new AuthError('USER_NOT_FOUND', 'No account found with this email address');
    }

    const user = result[0];
      if(user.provider !== "credentials") {
      throw new AuthError('INVALID_PROVIDER', 'This account was created with an OAuth provider. Please sign in with that provider instead.');
    }

    if(user.is_verified === false) {
      console.log("User account is not verified:", email);
      throw new AuthError('ACCOUNT_NOT_VERIFIED', 'Your account is not verified. Please check your email for the verification code.');
    }

    console.log("User found:", { id: user.id, email: user.email, hasPassword: !!user.password_hash });

    // Check if user has a password set (for OAuth users who might not have passwords)
    if (!user.password_hash) {
      console.log("User exists but has no password hash - likely OAuth user");
      throw new AuthError('NO_PASSWORD', 'This account was created with Google. Please sign in with Google instead.');
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log("Password match result:", isMatch);
    
    if (!isMatch) {
      console.log("Password does not match for user:", email);
      throw new AuthError('INVALID_PASSWORD', 'Incorrect password');
    }

    console.log("User authenticated successfully:", { id: user.id, email: user.email });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      role: (user.role === "admin" ? "admin" : "user"),
    };
    
  } catch (error) {
    if (error instanceof AuthError) {
      console.error(`Auth error [${error.code}]:`, error.message);
      throw error; // Re-throw AuthError to preserve error details
    }
    
    console.error("Unexpected error validating user credentials:", error);
    throw new AuthError('DATABASE_ERROR', 'Unable to validate credentials. Please try again.');
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      role: user.role === "admin" ? "admin" : "user",
      createdAt: user.created_at ?? undefined,
    };
  } catch (error) {
    console.error("Error getting user by email:", error);
    return null;
  }
};

export const createUser = async (
  userData: CreateUserData,
): Promise<User | null> => {
  try {
    let hashedPassword = null;

    if (userData.password) {
      const saltRounds = 12;
      hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    }

    const result = await db
      .insert(users)
      .values({
        name: userData.name,
        email: userData.email,
        password_hash: hashedPassword,
        role: userData.role || "user",
        created_at: new Date(),
        provider: "credentials", // Assuming this is a credentials-based user
      })
      .returning();

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      role: user.role === "admin" ? "admin" : "user",
      createdAt: user.created_at ?? undefined,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const result = await db.select().from(users).where(eq(users.id, id));

    if (result.length === 0) {
      return null;
    }

    const user = result[0];

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      role: user.role === "admin" ? "admin" : "user",
      createdAt: user.created_at ?? undefined,
    };
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return null;
  }
};

export const userExists = async (email: string): Promise<boolean> => {
  try {
    const result = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email));
    return result.length > 0;
  } catch (error) {
    console.error("Error checking if user exists:", error);
    return false;
  }
};

export const retrievePasswordHash = async (email: string) => {
  try {
    const result = await db
      .select({ password: users.password_hash })
      .from(users)
      .where(eq(users.email, email));

    return result[0];
  } catch (error) {
    console.error("Error retrieving password hash:", error);
    return null;
  }
};

export const handleGoogleSignIn = async (
  data: GoogleSignInData
): Promise<GoogleSignInResult> => {
  try {
    console.log("Handling Google sign-in for:", data.email);

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, data.email));

    if (existingUser.length > 0) {
      const user = existingUser[0];
      console.log("Existing user found:", { 
        id: user.id, 
        email: user.email,
        hasPassword: !!user.password_hash 
      });

      // Check if this user was created with credentials (has a password)
      if (user.password_hash) {
        console.log("User has password - was created with credentials, blocking Google sign-in");
        return {
          success: false,
          error: "ACCOUNT_EXISTS_WITH_PASSWORD"
        };
      }

      // User exists and was created with Google - update their info and sign them in
      console.log("User exists with Google - updating info and signing in");
      
      const updatedUser = await db.update(users)
        .set({
          name: data.name,
          profile_pic: data.image,
          // Keep existing role
        })
        .where(eq(users.id, user.id))
        .returning();

      return {
        success: true,
        user: {
          id: updatedUser[0].id,
          name: updatedUser[0].name,
          email: updatedUser[0].email,
          profile_pic: updatedUser[0].profile_pic,
          role: updatedUser[0].role === "admin" ? "admin" : "user",
          provider: "google",
        }
      };
    }

    // User doesn't exist - create new Google user
    console.log("Creating new Google user");
    
    const newUser = await db.insert(users)
      .values({
        name: data.name,
        email: data.email,
        profile_pic: data.image,
        password_hash: null, // Google users don't have passwords
        role: "user",
        is_verified: true, // Assuming Google users are verified
        provider: "google", // Set provider to Google
        // created_at will be set by default
      })
      .returning();

    if (newUser.length === 0) {
      console.error("Failed to create new user");
      return {
        success: false,
        error: "USER_CREATION_FAILED"
      };
    }

    console.log("Successfully created new Google user:", newUser[0].id);

    return {
      success: true,
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
        profile_pic: newUser[0].profile_pic,
        role: newUser[0].role === "admin" ? "admin" : "user",
        provider: "google",
      }
    };

  } catch (error) {
    console.error("Error in handleGoogleSignIn:", error);
    return {
      success: false,
      error: "GOOGLE_SIGNIN_ERROR"
    };
  }
};