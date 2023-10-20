"use client";
import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";
import { useToast } from "@/components/ui/use-toast";


export default function ImagePage() {
  const { reloadAuthUser } = useAuthUser();
  const { toast } = useToast();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/image",
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
      type="image"
      isLoading={isLoading}
      inputMessage={input}
      onChange={handleInputChange}
      messages={messages}
      onSubmit={handleSubmit}
      placeholder="Enter a prompt for an image to generate!"
    />
  );
}
