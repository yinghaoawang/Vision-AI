"use client";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/image",
  });
  return (
    <ToolPage
      type="image"
      inputMessage={input}
      onChange={handleInputChange}
      messages={messages}
      onSubmit={handleSubmit}
    />
  );
}
