import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full grow items-center justify-center bg-slate-900">
      {children}
    </div>
  );
}
