"use client";
import UserMenu from "./user-menu";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { NavbarLogo } from "./navbar-logo";
import { useUser } from "@clerk/nextjs";
import { SignUpButton } from "@clerk/nextjs";

const Navbar = () => {
  const { user: currentUser } = useUser();
  return (
    <div className="flex flex-col bg-slate-950">
      <div className="hidden h-[var(--navbar-height)] w-full items-center justify-between px-10 text-white md:flex">
        <div className="flex gap-10">
          <NavbarLogo />
        </div>
        <div className="flex items-center gap-10">
          {currentUser && <UserMenu />}
          {!currentUser && <SignUpButton>Log in</SignUpButton>}
        </div>
      </div>
      <MobileSidebar />
    </div>
  );
};

export default Navbar;
