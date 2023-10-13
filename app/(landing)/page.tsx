"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Typewriter from "typewriter-effect";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 ">
      <div className="flex w-full grow flex-col text-white">
        <div className="flex items-center justify-between px-5">
          <Link
            href="/login"
            className="mb-3 flex w-full items-center gap-3 py-3 font-semibold"
          >
            <Image width={40} height={40} src="/logo.svg" alt="Logo" />
            <span>Vision AI</span>
          </Link>
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
            <Button variant='gradient'>Start Generating For Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
