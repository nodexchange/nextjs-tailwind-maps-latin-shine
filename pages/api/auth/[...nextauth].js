import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';

const auth0 = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    })
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

const options = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'bachata_dancer@highwycombe.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        // const hostname = `http://${req.headers.host}`;
        // const hostname = 'h'
        console.log('AUTHORIZE???');
        const hostname = req.headers.origin;
        if ('username' in credentials && 'password' in credentials) {
          const res = await fetch(`${hostname}/api/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
          });
          const user = await res.json();
          if (res.ok && user) {
            if (user.error) {
              // bad credentials
              return null;
            }
            return user;
          }
          // login failed
          return null;
        }
        return null;
      },
    })
    /* GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }), */
  ],
  callbacks: {
    async session({ session, user, token }) {
      console.log('>>> SESSION CALLBACK');
      if (token) {
        session.user.admin = token.admin;
      }
      console.log('>>> SESSION return');
      return Promise.resolve(session); 
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      token.user = user;
      console.log('>>> jwt return');
      if (user) {
        token.admin = user.admin;
      }
      console.log('>>> jwt return');
      // return token;
      return Promise.resolve(token);
    },
  },
  // session: {
  //   strategy: 'jwt',
  // },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
