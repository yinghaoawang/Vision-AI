"use client";
import { useAuthUser } from "@/app/_contexts/AuthUserContext";
import ToolPage from "../tool-page";
import { useChat } from "ai/react";

export default function ImagePage() {
  const { reloadAuthUser } = useAuthUser();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/image",
      onResponse: () => {
        reloadAuthUser();
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
