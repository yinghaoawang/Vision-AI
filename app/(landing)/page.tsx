"use client";
import { NavbarLogo } from "@/components/navbar/navbar-logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen justify-center bg-slate-900 ">
      <div className="flex w-full max-w-[1000px] grow flex-col text-white">
        <div className="flex items-center justify-between px-5">
          <NavbarLogo />
          <Link href="/login">
            <Button
              className="w-[120px] rounded-full font-semibold"
              variant={"white"}
            >
              Get Started
            </Button>
          </Link>
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
          <Link href="/login">
            <Button variant="gradient">Start Generating For Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
