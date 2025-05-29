import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { validateUserCredentials } from "./authHelper";
import { AuthOptions } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "user" | "admin";
    username?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: "user" | "admin";
      username?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "admin";
    username?: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        const user = await validateUserCredentials(credentials.username, credentials.password);
        if (!user) return null;

        return {
          id: user.id,
          email: user.email || null,
          name: user.name || null,
          role: user.role || "user", 
        } 
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.username = user.name || undefined; // Use name as username
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "user"; // Default to "user"
        session.user.username = token.username || undefined; // Use name as username
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET
};