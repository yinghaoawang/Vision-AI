import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex w-full grow bg-slate-700 ">
        <div className="flex grow justify-center">
          <div className="w-full max-w-[600px] bg-gray-200">
            <div className="mt-6 space-y-2 text-center">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
