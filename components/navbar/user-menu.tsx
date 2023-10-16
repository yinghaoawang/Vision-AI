"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";
import SettingsDialog from "@/app/(dashboard)/settings/settings-dialog";

const UserMenu = () => {
  const { user: currentUser } = useUser();

  return (
    <>
      <SettingsDialog className="whitespace-nowrap">Hello {currentUser?.firstName}!</SettingsDialog>
      <SignOutButton>
        <button className="whitespace-nowrap">Sign Out</button>
      </SignOutButton>
    </>
  );
};

export default UserMenu;
