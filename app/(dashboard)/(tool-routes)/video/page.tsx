"use client";
import { ChangeEventHandler, useState } from "react";
import ToolPage from "../tool-page";
import api from "@/app/_utils/api";
import { uid } from "react-uid";
import { Message } from "ai";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const handleInputChange: ChangeEventHandler<HTMLTextAreaElement> = (
    event,
  ) => {
    setInput(event.target?.value);
  };
  const handleSubmit = async () => {
    const prevMessages = [...messages];
    const inputMessage: Message = {
      id: uid(input),
      content: input,
      role: "user",
    };
    const newMessages = [...messages, inputMessage];
    setMessages(newMessages);
    setInput("");
    try {
      const res = await api.post("/api/video", { messages: newMessages });
      const resMessage: Message = {
        id: uid(res.data),
        role: "assistant",
        content: res.data,
      };
      setMessages([...newMessages, resMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prevMessages);
    }
  };
  return (
    <ToolPage
      type="video"
      inputMessage={input}
      onChange={handleInputChange}
      messages={messages}
      onSubmit={handleSubmit}
    />
  );
}
