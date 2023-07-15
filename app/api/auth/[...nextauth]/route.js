import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";
import { connectToDB } from "@utils/database";

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
			await connectToDB();

			// check if a user already exists
			const UserExists = await User.findOne({
				email: profile.email,
			});

			// if not create a new user and save to DB
			if (!UserExists) {
				await User.create({
					email: profile.email,
					username: profile.name.replace(" ", "").toLowerCse(),
					image: profile.picture,
				});
			}
			return true;
		} catch (error) {
			console.log(error);
			return false;
		}
	},
});

export { handler as GET, handler as POST };

// we create the client id and secret from 'console.cloud.google.com'
