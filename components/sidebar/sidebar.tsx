"use client";

import SettingsDialog from "@/app/(dashboard)/settings/settings-dialog";
import { cn } from "@/lib/utils";
import {
  Home,
  MessagesSquare,
  Image,
  Film,
  Disc3,
  Code,
  Cog,
} from "lucide-react";
import { Rubik } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const tools = [
  {
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
    color: "text-blue-500",
  },
  {
    label: "Chat With AI",
    icon: MessagesSquare,
    href: "/chat",
    color: "text-red-500",
  },
  {
    label: "Generate Images",
    icon: Image,
    href: "/image",
    color: "text-green-500",
  },
  {
    label: "Generate Videos",
    icon: Film,
    href: "/video",
    color: "text-orange-500",
  },
  {
    label: "Generate Music",
    icon: Disc3,
    href: "/music",
    color: "text-yellow-500",
  },
  {
    label: "Generate Code",
    icon: Code,
    href: "/code",
    color: "text-violet-500",
  },
  {
    label: "Settings",
    icon: Cog,
    color: "text-gray-200",
  },
];

const sidebarHeight = "h-[calc(100vh-var(--navbar-height))]";

const linkFont = Rubik({
  subsets: ["latin"],
});

export default function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col space-y-1 overflow-auto bg-slate-950/90 py-5",
        sidebarHeight,
        className,
      )}
    >
      {tools.map((route) => {
        const isSelected = route.href === pathname;
        const isSettings = route.label === "Settings";
        if (isSettings)
          return (
            <SettingsDialog
              key={route.label}
              className={cn(
                "flex min-h-[55px] items-center px-3 pl-6 text-sm text-white hover:bg-white/10",
                linkFont,
              )}
            >
              <route.icon className={cn("mr-4", route.color)} /> {route.label}
            </SettingsDialog>
          );
        return (
          <Link
            className={cn(
              "flex min-h-[55px] items-center px-3 pl-6 text-sm text-white hover:bg-white/10",
              linkFont,
              isSelected && "bg-white/10",
            )}
            href={route.href || ""}
            key={route.label}
          >
            <route.icon className={cn("mr-4", route.color)} /> {route.label}
          </Link>
        );
      })}
    </div>
  );
}
