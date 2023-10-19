import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Sidebar from "./sidebar";
import TokensDisplay from "../navbar/tokens-display";

const SidebarTopbar = () => {
  return (
    <div className="flex bg-inherit text-white md:hidden">
      <div className="mx-5 flex h-[var(--navbar-height)] w-full items-center justify-between px-4 text-center">
        <Menu />
        <TokensDisplay />
      </div>
    </div>
  );
};

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SidebarTopbar />
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <Sidebar className="h-[100svh] pt-10" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
