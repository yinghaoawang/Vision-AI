"use client";
import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";

export default function ChatPage() {
  const { reloadAuthUser } = useAuthUser();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onResponse: () => {
        reloadAuthUser();
      },
    });
  return (
    <ToolPage
      type="chat"
      inputMessage={input}
      onChange={handleInputChange}
      messages={messages}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      placeholder="Talk to me or ask me about anything!"
    />
  );
}
