import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { validateUserCredentials, AuthError, handleGoogleSignIn } from "./authHelper";
import { AuthOptions } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: "user" | "admin";
    email?: string;
    provider?: "credentials" | "google";
  }

  interface Session {
    user: {
      id?: string;
      role?: "user" | "admin";
      name?: string | null;
      email?: string | null;
      image?: string | null;
      provider?: "credentials" | "google";
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "admin";
    email?: string;
    name?: string;
    provider?: "credentials" | "google";
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          console.log("Missing credentials in authorize function");
          throw new Error("EMAIL_PASSWORD_REQUIRED");
        }

        try {
          const user = await validateUserCredentials(
            credentials.email,
            credentials.password,
          );
          
          if (!user) {
            console.log("validateUserCredentials returned null");
            throw new Error("INVALID_CREDENTIALS");
          }

          console.log("User authenticated successfully:", { 
            id: user.id, 
            email: user.email,
            role: user.role 
          });

          return {
            id: user.id,
            email: user.email ?? undefined,
            name: user.name ?? undefined,
            role: user.role || "user",
            provider: "credentials",
          };
          
        } catch (error) {
          console.error("Error in authorize function:", error);
          
          if (error instanceof AuthError) {
            switch (error.code) {
              case 'ACCOUNT_NOT_VERIFIED':
                throw new Error("ACCOUNT_NOT_VERIFIED");
              case 'USER_NOT_FOUND':
                throw new Error("USER_NOT_FOUND");
              case 'INVALID_PASSWORD':
                throw new Error("INVALID_PASSWORD");
              case 'NO_PASSWORD':
                throw new Error("USE_GOOGLE_SIGNIN");
              case 'MISSING_CREDENTIALS':
                throw new Error("EMAIL_PASSWORD_REQUIRED");
              default:
                throw new Error("DATABASE_ERROR");
            }
          }
          
          throw new Error("AUTHENTICATION_FAILED");
        }
      },
    }),
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle Google OAuth sign-in
      if (account?.provider === "google") {
        try {
          console.log("Google sign-in attempt for:", user.email);
          
          
          
          const result = await handleGoogleSignIn({
            email: user.email!,
            name: user.name!,
            image: user.image || null,
            googleId: account.providerAccountId,
          });

          if (result.success && result.user) {
            // Update the user object with database info
            user.id = result.user.id;
            user.role = result.user.role;
            user.provider = "google";
            console.log("Google sign-in successful for user:", result.user.id);
            return true;
          } else {
            console.error("Google sign-in failed:", result.error);
            // NextAuth will show this as a sign-in error
            return `/login?error=${encodeURIComponent(result.error || 'GOOGLE_SIGNIN_FAILED')}`;
          }
          
        } catch (error) {
          console.error("Error in Google signIn callback:", error);
          return `/login?error=${encodeURIComponent('GOOGLE_SIGNIN_ERROR')}`;
        }
      }

      // Allow all other sign-ins (credentials)
      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
        token.username = user.name;
        token.email = user.email;
        token.provider = (user.provider as "google" | "credentials") || (account?.provider as "google" | "credentials") || "credentials";
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role || "user";
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.provider = token.provider;
      }
      return session;
    },
  },
  
  pages: {
    signIn: "/login",
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};