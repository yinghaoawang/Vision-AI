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
import { SignOutButton } from "@clerk/nextjs";

const tokenOptions = [
  {
    price: 5,
    tokens: 4000,
  },
  {
    price: 10,
    tokens: 9000,
  },
  {
    price: 20,
    tokens: 20000,
  },
];

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
            <span className="mt-1 flex flex-col gap-4">
              <span>
                You are currently have <span className="text-yellow-500">100 tokens</span>
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex flex-col justify-evenly gap-2 sm:flex-row">
                  {tokenOptions.map((option) => (
                    <Button
                      key={option.tokens}
                      className="flex h-20 w-full flex-col gap-1 bg-yellow-500 hover:bg-yellow-500/90"
                    >
                      <span className="font-bold">${option.price} USD</span>
                      <span className="whitespace-nowrap">
                        {option.tokens} tokens
                      </span>
                    </Button>
                  ))}
                </span>
                <Button
                  variant="ghost"
                  className="nowrap mt-2 w-full font-bold"
                  size="lg"
                >
                  Purchase History
                </Button>
                <SignOutButton>
                  <Button
                    variant="ghost"
                    className="font-bold text-red-500/80 hover:text-red-500"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
