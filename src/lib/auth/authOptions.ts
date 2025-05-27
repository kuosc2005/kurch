import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createUser, getUserByEmail, validateUserCredentials } from "./authHelper";
import { JWT, User } from "next-auth";


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

  interface JWT {
    id?: string;
    role?: "user" | "admin";
    username?: string;
  }

}

export const authOptions = {
  providers: [
    //google credentials provider garna baki xa
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

        let user = await validateUserCredentials(credentials.username,
          credentials.password);
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

    async jwt({ token , user }:{
      token:JWT,
      user?: User | null,
      account?: any,
      profile?: any}) {

 
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.username = user.name || undefined; // Use name as username
      }
      return token;
    },
    async session({ session, token }: { session: import("next-auth").Session, token: JWT }) {
      if(token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "user"; // Default to "user"
        session.user.username = token.username || undefined; // Use name as username
      }
      return session;
    }
  },
  pages:{
    signIn: "/auth/signin",
  },
  session:{
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET
};


