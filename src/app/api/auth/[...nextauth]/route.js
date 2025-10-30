import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password, localData } = credentials;
        const data = JSON.parse(localData);
        const user = data.find(
          (item) => item.email === email && item.password === password
        );
        if (user) {
          return { email: user.email };
        } else {
          console.log("Invalid credentials");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },

    // user info. added in session
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },
});
export { handler as GET, handler as POST };

