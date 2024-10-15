import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/prisma";
import { comparePasswordAndHash } from "./utils/password";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string | undefined, password: string | undefined }

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email and password")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: email as string
          }
        })

        if (!user) {
          throw new CredentialsSignin("No user found")
        }
        
        const account = await prisma.account.findFirst({
          where: {
            userId: user.id,
            provider: "credentials",
          },
        });

        if (!account || !account.access_token) {
          throw new CredentialsSignin("Account or access token not found.")
        }

        // const passwordMatch = "test"
        const passwordMatch = comparePasswordAndHash(
          password,
          account.access_token
        );

        if (!passwordMatch) {
          throw new CredentialsSignin("Password does not match.")
        }

        return user
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.userId = token.id as string;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const email = profile?.email
        
        const user = await prisma.user.findFirst({
          where: {
            email
          }
        })

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              email,
              name: profile?.name,
              image: profile?.picture,
            }
          })

          await prisma.account.create({
            data: {
              userId: newUser.id,
              provider: account.provider,
              type: account.type,
              access_token: account.accessToken as string,
              providerAccountId: account.providerAccountId as string,
              scope: account.scope as string,
              refresh_token: account.refreshToken as string,
              token_type: account.tokenType as string,
            }
          })
        }
        return true
      }
      return true
    }
  },
})