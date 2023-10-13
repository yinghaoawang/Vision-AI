"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  KeyboardEvent,
  SetStateAction,
  useRef,
} from "react";
import { SendHorizonal } from "lucide-react";
import { ChatCompletionMessage } from "openai/resources/chat/index.mjs";
import ReactMarkdown from "react-markdown";

const messagesHeight =
  "h-[calc(100vh-var(--message-box-height)-var(--navbar-height))]";

const MessageContent = ({
  messages,
}: {
  messages?: ChatCompletionMessage[];
}) => {
  return (
    <div className="mb-2 w-full">
      {messages?.map((message, index) => {
        const bgColor = message.role === "user" ? "bg-slate-800" : "bg-inherit";
        return (
          <div
            key={"message" + index}
            className={cn("flex w-full justify-center space-y-4 py-2", bgColor)}
          >
            <div className="flex w-full max-w-[800px] justify-center px-7">
              <div className="w-full">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="my-4 leading-8" {...props} />
                    ),
                    pre: ({ node, ...props }) => (
                      <div className="my-2 w-full overflow-auto rounded-lg bg-black/10 px-4 py-2">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="rounded-lg bg-black/10 p-2" {...props} />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function ToolPage({
  inputMessage,
  setInputMessage,
  messages,
  submitHandler,
}: {
  messages?: ChatCompletionMessage[];
  submitHandler: FormEventHandler;
  inputMessage: string;
  setInputMessage: Dispatch<SetStateAction<string>>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const requestSubmitForm = () => {
    formRef?.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  };

  const textAreaKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      event.preventDefault();
      requestSubmitForm();
    }
  };

  const textAreaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setInputMessage(event.target.value);
  };

  return (
    <div className="h-inherit flex w-full flex-col text-gray-200">
      <div
        className={cn("flex flex-col-reverse overflow-auto", messagesHeight)}
      >
        <MessageContent messages={messages} />
      </div>
      <form
        className="flex h-[var(--message-box-height)] justify-center px-5 py-3"
        onSubmit={submitHandler}
        ref={formRef}
      >
        <div className="relative w-full max-w-[800px]">
          <Textarea
            value={inputMessage}
            className="bg-slate-800 pr-[50px] text-gray-200 outline-none"
            placeholder="Ask me anything"
            onChange={textAreaChangeHandler}
            onKeyDown={textAreaKeyPressHandler}
          />
          <Button
            className={cn(
              "absolute bottom-4 right-4 h-[40px] w-[40px] bg-transparent p-0 transition-colors duration-500 hover:bg-inherit",
              inputMessage.length > 0 && "bg-green-600 hover:bg-green-700",
            )}
            onClick={(event) => {
              event.preventDefault();
              requestSubmitForm();
            }}
          >
            <SendHorizonal size="20" />
          </Button>
        </div>
      </form>
    </div>
  );
}
