"use client";
import SettingsDialog from "@/app/(dashboard)/settings/settings-dialog";
import TokensDisplay from "./tokens-display";
import { UserResource } from "@clerk/types";

const UserMenu = ({ currentUser }: { currentUser: UserResource }) => {
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
