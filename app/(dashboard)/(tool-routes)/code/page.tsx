"use client";
import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";
import { useToast } from "@/components/ui/use-toast";


export default function CodePage() {
  const { reloadAuthUser } = useAuthUser();
  const { toast } = useToast();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/code",
      onResponse: () => {
        reloadAuthUser();
      },
      onError: (error) => {
        const statusCode = JSON.parse(error.message)?.statusCode;
        if (statusCode === "TOKENS_EXHAUSTED") {
          toast({
            variant: "destructive",
            description: "Not enough tokens to make request.",
          });
        }
      },
    });
  return (
    <ToolPage
      type="code"
      inputMessage={input}
      onChange={handleInputChange}
      messages={messages}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      placeholder="Enter a prompt to generate some code!"
    />
  );
}
