import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// import type { Provider } from "next-auth/providers";

// import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma";

// import { getUserFromDb } from "@/utils/db";
// import { signInSchema } from "./lib/zod";
import { comparePasswordAndHash } from "./utils/password";

// const providers: Provider[] = [
//   Credentials({
//     credentials: {
//       email: { label: "email", type: "email" },
//       password: { label: "password", type: "password" },
//     },
//     async authorize(credentials) {
//       const { email, password } = await signInSchema.parseAsync(credentials);
//       const user = await getUserFromDb(email);

//       if (!user) {
//         throw new Error("User not found.");
//       }

//       const account = await prisma.account.findFirst({
//         where: {
//           userId: user.id,
//           provider: "credentials",
//         },
//       });

//       if (!account || !account.access_token) {
//         throw new Error("Account or access token not found.");
//       }

//       const passwordMatch = comparePasswordAndHash(
//         password,
//         account.access_token
//       );

//       if (!passwordMatch) {
//         throw new Error("Password does not match.");
//       }

//       return user;
//     },
//   }),
// ];

// export const providerMap = providers
//   .map((provider) => {
//     if (typeof provider === "function") {
//       const providerData = provider();
//       return { id: providerData.id, name: providerData.name };
//     } else {
//       return { id: provider.id, name: provider.name };
//     }
//   })
//   .filter((provider) => provider.id !== "credentials");

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers,
//   pages: {
//     signIn: "/auth/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.userId = token.id as string;
//       }
//       return session;
//     },
//   },
//   secret: process.env.AUTH_SECRET,
// });


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
  },
})