import { signOut, auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  test?: string;
};

async function Hello({}: Props) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container h-screen flex gap-4 flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">Hello, {session.user?.name}</h1>
      <p className="text-muted-foreground">Welcome back to your account</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <Button type="submit" className="w-full sm:w-auto rounded-full">
          Log out
        </Button>
      </form>
    </div>
  );
}

export default Hello;
