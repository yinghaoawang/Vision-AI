"use client";
import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";

export default function CodePage() {
  const { reloadAuthUser } = useAuthUser();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/code",
      onResponse: () => {
        reloadAuthUser();
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
