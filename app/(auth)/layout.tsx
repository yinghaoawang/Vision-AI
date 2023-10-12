import { ReactNode } from "react";
import Navbar from "@/components/navbar/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex grow">{children}</div>
    </div>
  );
}
