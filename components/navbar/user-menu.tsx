"use client";
import SettingsDialog from "@/app/(dashboard)/settings/settings-dialog";
import TokensDisplay from "./tokens-display";
import useAuthUser from "@/app/_hooks/useAuthUser";

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
