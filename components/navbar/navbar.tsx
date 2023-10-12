import UserMenu from "./user-menu";
import Link from "next/link";
import MobileSidebar from "../sidebar/mobile-sidebar";
import { getCurrentUser } from "@/actions/auth";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="flex flex-col bg-slate-950">
      <div className="hidden h-[var(--navbar-height)] w-full items-center justify-between px-10 text-white md:flex">
        <div className="flex gap-10">
          <Link href="/dashboard">Home</Link>
        </div>
        <div className="flex items-center gap-10">
          {currentUser && <UserMenu currentUser={currentUser} />}
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
