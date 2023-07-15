import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	async session({ session }) {},
	async signIn({ profile }) {
		try {
			//every next js route is known as a serverless route
		} catch (error) {}
	},
});

export { handler as GET, handler as POST };

// we create the client id and secret from 'console.cloud.google.com'
