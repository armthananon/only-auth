import { Session } from "next-auth";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";

type ProfileCardProps = {
  session: Session;
};

const ProfileCard = (session: ProfileCardProps) => {
  const user = session.session.user;
  const profileImage = user?.image || "https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg";
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Hello, {user?.name}</CardTitle>
          <CardDescription className="text-m text-muted-foreground">Welcome back to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            <div className="w-32 h-32 relative">
                <Image
                  src={profileImage}
                  alt="profile"
                  width={500}
                  height={500}
                  className="rounded-full w-full h-full object-cover"
                />
            </div>
            <div>
                <div>
                    <h1 className="font-bold text-lg">Name</h1>
                    <p className="text-lg text-muted-foreground">&nbsp;&nbsp; {user?.name}</p>
                </div>
                <div>
                    <h1 className="font-bold text-lg">Email</h1>
                    <p className="text-lg text-muted-foreground">&nbsp;&nbsp; {user?.email}</p>
                </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full rounded-full">Setting</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProfileCard;
