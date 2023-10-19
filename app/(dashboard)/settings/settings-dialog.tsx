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
import { useToast } from "@/components/ui/use-toast";
import { loadStripe } from "@stripe/stripe-js";
import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import SignOutButton from "@/components/navbar/sign-out-button";

type TokenOption = {
  price: number;
  tokens: number;
};

const tokenOptions: TokenOption[] = [
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
  const { authUserData } = useAuthUser();

  const handlePaymentHistory = async () => {
    try {
      const response = await fetch("/api/payment/history");
      if (!response.ok) {
        throw new Error("Bad response from server");
      }
      const session = await response.json();
      // open in a new window
      window.open(session?.url, "_blank");
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Payment",
        description: "Something went wrong, try again later.",
      });
    }
  };

  const handlePurchaseToken = async (option: TokenOption) => {
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        body: JSON.stringify({
          product: option,
        }),
      });
      if (!response.ok) {
        throw new Error("Bad response from server");
      }
      const session = await response.json();
      const stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_API_PUBLISHABLE_KEY as string,
      );

      void stripePromise.then((Stripe) => {
        Stripe?.redirectToCheckout({
          sessionId: session.id,
        });
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Payment",
        description: "Something went wrong, try again later.",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger className={cn("flex w-full", className)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            <span className="mt-1 flex flex-col gap-1">
              <span>
                You are currently have&nbsp;
                <span className="text-yellow-500">
                  {authUserData?.tokens} tokens
                </span>
              </span>
              <span className="text-xs">
                Tokens are used to talk and make requests to Vision.
              </span>
              <span className="mt-3 flex flex-col gap-1">
                <span className="flex flex-col justify-evenly gap-2 sm:flex-row">
                  {tokenOptions.map((option) => (
                    <Button
                      onClick={() => handlePurchaseToken(option)}
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
                  onClick={handlePaymentHistory}
                >
                  Payment History
                </Button>
                <SignOutButton>Sign Out</SignOutButton>
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
