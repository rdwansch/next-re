import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from 'prisma/config';
import bcrypt from 'bcrypt';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  theme: {
    colorScheme: 'light',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text', placeholder: 'enter username' },
        password: { label: 'password', type: 'password', placeholder: 'enter password' },
      },

      async authorize(credentials, req) {
        try {
          const user = await prisma.user.findFirst({
            where: {
              username: `${credentials?.username}`,
            },
          });

          if (user) {
            const isValid = bcrypt.compareSync(credentials?.password!, user.password!);

            if (!isValid) {
              console.log('username or passowrd is wrong');
              throw new Error('username or passowrd is wrong');
            }
            return user;
          }
          return null;
        } catch (err) {
          console.log('Error on Authorize:', err);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
