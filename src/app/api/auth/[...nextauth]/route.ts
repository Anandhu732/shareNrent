import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a demo implementation - in a real app, you'd check credentials
        // against a database and hash the password
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        // For demo purposes, allow test@example.com / password123
        if (credentials.email === "test@example.com" && credentials.password === "password123") {
          return {
            id: "1",
            name: "Test User",
            email: credentials.email,
            image: "https://via.placeholder.com/150",
          };
        }
        
        // For a real implementation, check your database here
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST }; 