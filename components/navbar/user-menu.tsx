"use client";
import SettingsDialog from "@/app/(dashboard)/settings/settings-dialog";
import TokensDisplay from "./tokens-display";
import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import { useEffect } from "react";

const UserMenu = () => {
  const { authUser } = useAuthUser();
  return (
    <>
      <SettingsDialog className="whitespace-nowrap">
        Hello {authUser?.firstName}!
      </SettingsDialog>
      <TokensDisplay />
    </>
  );
};

export default UserMenu;
