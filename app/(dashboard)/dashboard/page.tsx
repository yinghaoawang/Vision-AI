"use client";

import { tools } from "@/components/sidebar/sidebar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const openers = [
  "Delve into the Realm of AI",
  "Experience AI Beyond Conversation",
  "AI: Your Ultimate Creative Toolkit",
  "Discover AI's Multifaceted Abilities",
  "Dive into the AI Revolution",
];

const descriptions = [
  "Explore the spectrum of AI's talents, from generating photos and videos to crafting code, all in one unified experience.",
  "Immerse yourself in the AI revolution, where you can harness the creative power of this technology to produce photos, videos, and code effortlessly.",
  "Unleash the creative potential of AI by generating stunning photos, captivating videos, and efficient code with ease.",
  "Step beyond conversation and tap into the expansive world of AI's capabilities, from crafting visual content to coding solutions.",
  "Elevate your creativity with AI – effortlessly generate photos, videos, and code with the ultimate toolkit at your disposal.",
];

const dashboardHeight = "h-[calc(100svh-var(--navbar-height))]";

export default function DashboardPage() {
  const router = useRouter();
  const [selectedOpener, setSelectedOpener] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  useEffect(() => {
    setSelectedOpener(openers[Math.floor(Math.random() * openers.length)]);
    setSelectedDescription(
      descriptions[Math.floor(Math.random() * descriptions.length)],
    );
  }, []);

  return (
    <div className={cn("w-full overflow-y-auto", dashboardHeight)}>
      <div className="mx-auto max-w-[700px] grow space-y-4 px-3 pb-8 pt-6 text-white">
        <h2 className="text-center text-4xl font-bold">{selectedOpener}</h2>
        <div className="pb-6 text-center text-slate-400">
          {selectedDescription}
        </div>
        {tools.map((tool) => {
          if (tool.label === "Dashboard" || tool.label === "Settings") {
            return;
          }

          return (
            <Card
              className="flex cursor-pointer items-center justify-between border-black/[.15] bg-slate-800 px-7 py-5 text-white hover:bg-slate-800/80"
              key={tool.label}
              onClick={() => router.push(tool.href || "")}
            >
              <div>
                <div className="flex">
                  <tool.icon className={cn("mr-4", tool.color)} />
                  {tool.label}
                </div>
              </div>
              <ArrowRight size={22} />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
