import { eq } from "drizzle-orm";
import { db } from "@/db/schema";
import { users } from "@/db/user_schema";
import bcrypt from "bcrypt";

interface User {
  id: string;
  name: string;
  email: string;
  profile_pic?: string | null;
  orcid?: string | null;
  createdAt?: Date | null;
}


interface CreateUserData {
  name: string;
  email: string;
  password: string | null;
  profile_pic?: string | null;
  orcid?: string | null;
}

export const validateUserCredentials = async (
  email: string,
  password: string,
): Promise<User | null> => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email));

    if (result.length === 0) {
      return null; // no user
    }

    //user exists,
    const user = result[0];

    if (!user.password_hash) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      profile_pic: user.profile_pic,
      orcid: user.orcid,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error("Error validating user credentials:", error);
    return null;
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
      orcid: user.orcid,
      createdAt: user.createdAt,
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
        profile_pic: userData.profile_pic || null,
        // created_at: new Date().getTime().toLocaleString(),
        orcid: userData.orcid || null,
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
      orcid: user.orcid,
      createdAt: user.createdAt,
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
      orcid: user.orcid,
      createdAt: user.createdAt,
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
