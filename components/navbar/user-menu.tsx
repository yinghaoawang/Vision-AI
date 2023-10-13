"use client";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const UserMenu = () => {
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();
  const currentUser = session?.data?.user;

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      toast({
        title: "Logged out",
      });
      router.push("/");
      router.refresh();
    });
  };

  return (
    <>
      <span>Hello {currentUser?.name}!</span>
      <Button onClick={handleSignOut} variant="link" className="text-white">
        Sign out
      </Button>
    </>
  );
};

export default UserMenu;
