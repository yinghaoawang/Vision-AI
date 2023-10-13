"use client";
import { FormEvent, useState } from "react";
import ToolPage from "../tool-page";
import api from "@/app/_utils/api";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";

const messages: ChatCompletionMessage[] = [
  // {
  //   role: "user" as const,
  //   content: "Hey how do I do something?",
  // },
  // {
  //   role: "user" as const,
  //   content: "Potential bug",
  // },
  // {
  //   role: "assistant" as const,
  //   content: "this is how you do it",
  // },
  // {
  //   role: "user" as const,
  //   content: "Potential bug",
  // },
  // {
  //   role: "assistant" as const,
  //   content: "this is how you do it",
  // },
  // {
  //   role: "user" as const,
  //   content: "Potential bug",
  // },
  // {
  //   role: "assistant" as const,
  //   content: "this is how you do it",
  // },
  // {
  //   role: "user" as const,
  //   content: "Potential bug",
  // },
  // {
  //   role: "assistant" as const,
  //   content: "this is how you do it",
  // },
  // {
  //   role: "user" as const,
  //   content: "Potential bug",
  // },
  // {
  //   role: "assistant" as const,
  //   content: "this is how you do it",
  // },
];

export default function ChatPage() {
  const [inputMessage, setInputMessage] = useState("");
  const [currMessages, setCurrMessages] =
    useState<ChatCompletionMessage[]>(messages);

  const submitHandler = (event: FormEvent) => {
    console.log(inputMessage);
    const wrappedMessage: ChatCompletionMessage = {
      role: "user" as const,
      content: inputMessage,
    };
    const newMessages = [...currMessages, wrappedMessage];
    setCurrMessages(newMessages);
    setInputMessage("");
    api
      .post("/api/chat", {
        messages: newMessages,
      })
      .then((response) => {
        const content = JSON.parse(response?.data);
        const message = content?.choices?.[0]?.message as
          | ChatCompletionMessage
          | undefined;
        if (message == null)
          throw new Error("Could not get a response back from ChatGPT");

        setCurrMessages((prevMessages) => [...prevMessages, message]);
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
