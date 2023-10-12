"use client";
import { FormEvent, useState } from "react";
import ToolPage from "../tool-page";
import api from "@/app/_utils/api";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";

const messages: ChatCompletionMessage[] = [
  {
    role: "user" as const,
    content: "Hey how do I do something?",
  },
  {
    role: "user" as const,
    content: "Potential bug",
  },
  {
    role: "assistant" as const,
    content: "this is how you do it",
  },
  {
    role: "user" as const,
    content: "Potential bug",
  },
  {
    role: "assistant" as const,
    content: "this is how you do it",
  },
  {
    role: "user" as const,
    content: "Potential bug",
  },
  {
    role: "assistant" as const,
    content: "this is how you do it",
  },
  {
    role: "user" as const,
    content: "Potential bug",
  },
  {
    role: "assistant" as const,
    content: "this is how you do it",
  },
  {
    role: "user" as const,
    content: "Potential bug",
  },
  {
    role: "assistant" as const,
    content: "this is how you do it",
  },
];

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [currMessages, setCurrMessages] =
    useState<ChatCompletionMessage[]>(messages);

  const submitHandler = (event: FormEvent) => {
    console.log(inputMessage);
    const wrappedMessage = {
      role: "user" as const,
      content: inputMessage,
    };
    setCurrMessages([...currMessages, wrappedMessage]);
    setInputMessage("");
    api
      .post("/api/chat")
      .then((response) => {
        console.log("res", response);
      })
      .catch((error) => {
        console.error("err", error?.response?.data);
      });
  };
  return (
    <ToolPage
      inputMessage={inputMessage}
      setInputMessage={setInputMessage}
      messages={currMessages}
      submitHandler={submitHandler}
    />
  );
}
