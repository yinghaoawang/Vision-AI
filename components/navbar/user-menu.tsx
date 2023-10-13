"use client";
import { useUser, SignOutButton } from "@clerk/nextjs";

const UserMenu = () => {
  const { user: currentUser } = useUser();

  return (
    <>
      <span>Hello {currentUser?.firstName}!</span>
      <SignOutButton>Sign Out</SignOutButton>
    </>
  );
};

export default UserMenu;
