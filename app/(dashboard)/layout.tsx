"use client";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Navbar from "@/components/navbar/navbar";
import { LoadingPage } from "@/components/loading";
import { useAuthUser } from "../_contexts/AuthUserContext";

export default function Layout({ children }: { children: ReactNode }) {
  const { isLoading } = useAuthUser();
  if (isLoading) return <LoadingPage />;
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
