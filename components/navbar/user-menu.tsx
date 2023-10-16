"use client";
import { useUser } from "@clerk/nextjs";
import SettingsDialog from "@/app/(dashboard)/settings/settings-dialog";
import TokensDisplay from "./tokens-display";

const UserMenu = () => {
  const { user: currentUser } = useUser();

  return (
    <>
      <SettingsDialog className="whitespace-nowrap">
        Hello {currentUser?.firstName}!
      </SettingsDialog>
      <TokensDisplay />
    </>
  );
};

export default UserMenu;
