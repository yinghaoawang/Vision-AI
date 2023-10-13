"use client";
import { NavbarLogo } from "@/components/navbar/navbar-logo";
import { Button } from "@/components/ui/button";
import Typewriter from "typewriter-effect";
import { SignUpButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const { user: currentUser, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading</div>;

  if (currentUser != null) {
    router.push("/dashboard");
    console.log("logged in");
  }

  return (
    <div className="flex min-h-screen justify-center bg-slate-900 ">
      <div className="flex w-full max-w-[1200px] grow flex-col text-white">
        <div className="flex items-center justify-between px-5">
          <NavbarLogo />
          <SignUpButton>
            <Button
              className="w-[120px] rounded-full font-semibold"
              variant={"white"}
            >
              Get Started
            </Button>
          </SignUpButton>
        </div>
        <div className="mt-16 flex w-full flex-col items-center justify-center gap-3 text-4xl font-bold">
          <div>The Top Choice for</div>
          <div className="flex justify-center bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            <Typewriter
              options={{
                strings: [
                  "Conversational AI.",
                  "Photo Generation.",
                  "Music Generation.",
                  "Code Generation.",
                  "Video Generation.",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="mt-2">
            <SignUpButton>
              <Button variant="gradient">Start Generating For Free</Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </div>
  );
}
