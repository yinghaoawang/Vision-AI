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
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";

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
  const { toast } = useToast();
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
                You are currently have{" "}
                <span className="text-yellow-500">100 tokens</span>
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex flex-col justify-evenly gap-2 sm:flex-row">
                  {tokenOptions.map((option) => (
                    <Button
                      onClick={async () => {
                        try {
                          const response = await fetch("/api/payment", {
                            method: "POST",
                            body: JSON.stringify({
                              product: option,
                            }),
                          })
                            .then(function (response) {
                              if (!response.ok) {
                                throw new Error("Bad response from server");
                              }
                              return response.json();
                            })
                            .then(function (session) {
                              console.log(session);
                              const stripePromise = loadStripe(
                                process.env
                                  .NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY as string,
                              );
                              stripePromise.then((Stripe) => {
                                Stripe?.redirectToCheckout({
                                  sessionId: session.id,
                                });
                              });
                            });
                        } catch (error) {
                          console.error(error);
                          toast({
                            variant: "destructive",
                            title: "Payment",
                            description:
                              "Something went wrong, try again later.",
                          });
                        }
                      }}
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
                <Link href="https://billing.stripe.com/p/login/5kA8xo74zg9ofdK144">
                  <Button
                    variant="ghost"
                    className="nowrap mt-2 w-full font-bold"
                    size="lg"
                  >
                    Purchase History
                  </Button>
                </Link>
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