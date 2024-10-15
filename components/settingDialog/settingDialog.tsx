"use client";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { saveSetting } from "@/action/auth-action";

const SettingDialog = () => {
  const { data: session } = useSession();
  if (!session) redirect("/");

  const [name, setName] = React.useState(session?.user?.name);
  const [imgUrl, setImgUrl] = React.useState(session?.user?.image);

  const { toast } = useToast();

  const handleSaveUpdate = async () => {
    if (!name) {
      toast({
        title: "Invalid input",
        description: "Name is required",
        variant: "destructive",
      });
    }

    const email = session?.user?.email as string;
    const result = await saveSetting(email, name as string, imgUrl as string);

    console.log(result);

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full rounded-full">Setting</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Setting</DialogTitle>
            <DialogDescription>
              Change your profile information here
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4"></div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name?.toString()}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="imgurl">Image URL</Label>
            <Input
              type="text"
              id="imgurl"
              value={imgUrl?.toString()}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button onClick={handleSaveUpdate}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SettingDialog;
