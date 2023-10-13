"use client";
import UserMenu from "./user-menu";
import Link from "next/link";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { NavbarLogo } from "./navbar-logo";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  const currentUser = session?.data?.user;
  return (
    <div className="flex flex-col bg-slate-950">
      <div className="hidden h-[var(--navbar-height)] w-full items-center justify-between px-10 text-white md:flex">
        <div className="flex gap-10">
          <NavbarLogo />
        </div>
        <div className="flex items-center gap-10">
          {currentUser && <UserMenu />}
          {!currentUser && (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
      <MobileSidebar />
    </div>
  );
};

export default Navbar;
