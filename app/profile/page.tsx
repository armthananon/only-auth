import { signOut, auth } from "@/auth";
import ProfileCard from "@/components/profileCard/profileCard";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";
type Props = {
  test?: string;
};

async function ProfilePage({}: Props) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex gap-4 flex-col justify-center items-center">
      <ProfileCard session={session} />
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

export default ProfilePage;
