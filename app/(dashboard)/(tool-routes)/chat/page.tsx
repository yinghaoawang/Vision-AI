"use client";
import ToolPage from "../tool-page";
import { useChat } from 'ai/react'

export default function ChatPage() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <ToolPage
      inputMessage={input}
      onChange={handleInputChange}
      messages={messages}
      onSubmit={handleSubmit}
    />
  );
}
