import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export default function SettingsDialog({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger className={cn("flex w-full", className)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            <div className="mt-1 flex flex-col gap-3">
              <div>You are currently have 69 tokens.</div>
              <Button className="nowrap w-48" size="lg">
                Buy more tokens!
              </Button>
              <Button variant='success' className="nowrap w-48" size="lg">
                Purchase History
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
