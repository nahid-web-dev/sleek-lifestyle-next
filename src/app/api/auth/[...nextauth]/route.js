import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import User from '@/models/User.model';
import connectToDB from '@/lib/connectdb';
import { DateTime } from 'luxon';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || ""
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token, user }) {
      // Attach the user ID from the database to the session object
      await connectToDB()
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.id = dbUser._id;
      session.user.role = dbUser.role;
      return session;
    },
    async signIn({ user, account, profile }) {
      // Connect to MongoDB
      await connectToDB();

      // Check if user already exists in the database
      const existingUser = await User.findOne({ email: user.email });


      // Get the current date/time in a specific timezone
      const nowInDhaka = DateTime.now().setZone('Asia/Dhaka');
      const dhakaDate = nowInDhaka.toFormat('dd-MM-yyyy HH:mm:ss');

      if (!existingUser) {
        // Save the new user to the database
        if (user.email === process.env.ADMIN_EMAIL) {

          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            role: 'admin'
          });

        } else {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account.provider,
            createdAt: dhakaDate
          });
        }

      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }