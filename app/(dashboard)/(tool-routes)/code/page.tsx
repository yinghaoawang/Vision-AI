"use client";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/code",
    });
  return (
    <ToolPage
      type="chat"
      inputMessage={input}
      onChange={handleInputChange}
      messages={messages}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      placeholder="Enter a prompt to generate some code!"
    />
  );
}
