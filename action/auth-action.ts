"use server";

import { signIn } from "@/auth";
import { prisma } from "@/prisma";
import { hashPassword } from "@/utils/password";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const serverSignIn = async (email:string, password:string) => {
    try {
        const response = await signIn("credentials",{ email, password , redirect: false});
        if (response.error) {
            throw new AuthError(response.error);
        } else {
            redirect("/profile");
        }
    } catch (error) {
        if (error instanceof AuthError) {
            return error.message;
            // return redirect("/login");
        }
        throw error;
    }
}

export const serverSignUp = async (name: string, email:string, password:string) => {
    try {
        // validate the email and password
        if (!name || !email || !password) {
            throw new Error("Invalid input");
        }

        // existing user check
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (existingUser) {
            throw new Error("User already exists");
        }

        const hashedPassword = hashPassword(password);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                accounts: {
                    create: {
                        provider: "credentials",
                        type: "credentials",
                        providerAccountId: email,
                        access_token: hashedPassword,
                        createdAt: new Date(),
                    },
                },
            },
        });

        return user;
    } catch (error) {
        throw error;
    }
}