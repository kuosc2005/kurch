import CredentialsProvider from "next-auth/providers/credentials";
import { validateUserCredentials } from "./authHelper";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) { return null; }

        let user = await validateUserCredentials(credentials.username,
          credentials.password);

        return user; // authentication success 
      },
    }),
  ],
  callbacks: {
    async jwt({ token , user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
};
