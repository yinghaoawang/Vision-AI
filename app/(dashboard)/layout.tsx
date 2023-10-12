import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex w-full grow bg-slate-700 ">
        <div className="hidden w-[250px] flex-shrink-0 md:flex">
          <Sidebar />
        </div>
        <div className="flex grow">{children}</div>
      </div>
    </>
  );
}
