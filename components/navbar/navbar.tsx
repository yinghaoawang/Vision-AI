"use client";
import UserMenu from "./user-menu";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { NavbarLogo } from "./navbar-logo";
import Link from "next/link";
import useAuthUser from "@/app/_hooks/useAuthUser";
import { useEffect } from "react";

const NavbarContent = () => {
  const { authUser, isLoading } = useAuthUser();
  useEffect(() => {
    console.log(authUser, isLoading);
  }, [isLoading, authUser]);
  return (
    <>
      <div className="flex gap-10">
        <NavbarLogo />
      </div>
      <div className="flex items-center gap-10">
        {authUser != null && <UserMenu />}
        {authUser == null && (
          <Link href={authUser ? "/dashboard" : "/login"}>Log in</Link>
        )}
      </div>
    </>
  );
};

const Navbar = () => {
  return (
    <div className="flex flex-col bg-slate-950">
      <div className="hidden h-[var(--navbar-height)] w-full items-center justify-between px-10 text-white md:flex">
        <NavbarContent />
      </div>
      <MobileSidebar />
    </div>
  );
};

export default Navbar;
