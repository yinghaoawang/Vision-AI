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
      const decoder = new TextDecoder();

      const response = await fetch("/api/video", {
        method: "POST",
        body: JSON.stringify({
          messages: newMessages,
        }),
      });
      if (response?.body == null) throw new Error("res has no body");
      const reader = response.body.getReader();

      let done = false;

      while (!done) {
        try {
          const { value, done: doneReading } = await reader.read();
          done = doneReading;
          if (done) break;
          const data = JSON.parse(decoder.decode(value));
          const { url, error, status } = data;
          if (error) throw new Error(error);
          if (status) console.log(status);
          if (url) {
            const resMessage: Message = {
              id: uid(url),
              role: "assistant",
              content: url,
            };
            setMessages([...newMessages, resMessage]);
          }
        } catch (error) {
          console.error(error);
        }
      }

      console.log("done");
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
