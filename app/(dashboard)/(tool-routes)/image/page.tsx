"use client";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/image",
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
