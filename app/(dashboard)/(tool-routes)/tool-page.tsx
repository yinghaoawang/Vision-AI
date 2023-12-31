"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEvent,
  useRef,
} from "react";
import { SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Message } from "ai";

const isMobileUser = () => {
  let hasTouchScreen = false;

  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator?.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    hasTouchScreen = (navigator as any)?.msMaxTouchPoints > 0;
  } else {
    var mQ = (window as any)?.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      var UA = (navigator as any)?.userAgent;
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
        /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
    }
  }

  return hasTouchScreen;
};

type ToolType = "chat" | "image" | "video" | "music" | "code";

const messagesHeight =
  "h-[calc(100svh-var(--message-box-height)-var(--navbar-height))]";

const textareaHeight = "h-[var(--message-box-height)]";

const RenderContent = ({
  type,
  message,
}: {
  message: Message;
  type: ToolType;
}) => {
  if (message.role === "user" || type === "chat" || type === "code") {
    return (
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p className="my-4" {...props} />,
          pre: ({ node, ...props }) => (
            <div className="my-2 w-full overflow-auto rounded-lg bg-black/30 px-4 py-3 leading-6">
              <pre {...props} />
            </div>
          ),
          code: ({ node, ...props }) => (
            <code className="rounded-lg bg-black/30 p-1 leading-6" {...props} />
          ),
        }}
      >
        {message.content}
      </ReactMarkdown>
    );
  } else if (type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={message.id} src={`data:image/png;base64,${message.content}`} />
    );
  } else if (type === "video") {
    return (
      <video controls>
        <source src={message.content} />
      </video>
    );
  } else if (type === "music") {
    return (
      <audio controls>
        <source src={message.content} />
      </audio>
    );
  } else {
    throw new Error("Invalid tool type");
  }
};

const MessageContent = ({
  messages,
  type,
}: {
  messages?: Message[];
  type: ToolType;
}) => {
  const getInitMessage = (type: ToolType) => {
    switch (type) {
      case "chat":
        return "Chatting with me costs 10 tokens per request, let's talk!";
      case "image":
        return "Image requests are 50 tokens per request, give me a prompt!";
      case "video":
        return "Video requests are 300 tokens per request, give me a prompt!";
      case "music":
        return "Music requests are 200 tokens per request, give me a prompt!";
      case "code":
        return "Code requests are 10 tokens per requestg, give me a prompt!";

      default:
        throw new Error("Unrecognized tool type: " + type);
    }
  };
  const initialMessage: Message = {
    id: "initMessage",
    role: "assistant",
    content: getInitMessage(type),
  };
  return (
    <div className="mb-2 w-full">
      <div className="flex w-full justify-center space-y-4 bg-slate-900 py-2">
        <div className="flex w-full max-w-[800px] justify-center px-7">
          <div className="w-full leading-7">
            <RenderContent type="chat" message={initialMessage} />
          </div>
        </div>
      </div>

      {messages?.map((message, index) => {
        const bgColor = message.role === "user" ? "bg-slate-800" : "bg-inherit";
        return (
          <div
            key={"message" + index}
            className={cn("flex w-full justify-center space-y-4 py-2", bgColor)}
          >
            <div className="flex w-full max-w-[800px] justify-center px-7">
              <div className="w-full leading-7">
                <RenderContent type={type} message={message} />
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
  onChange,
  messages,
  onSubmit,
  isLoading,
  type,
  placeholder,
}: {
  messages?: Message[];
  onSubmit: FormEventHandler;
  inputMessage: string;
  isLoading: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  type: ToolType;
  placeholder?: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const requestSubmitForm = () => {
    formRef?.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
  };

  const textAreaKeyPressHandler = (event: KeyboardEvent) => {
    if (isMobileUser()) return;
    if (event.key === "Enter" && !event.shiftKey == true) {
      event.preventDefault();
      requestSubmitForm();
    }
  };

  return (
    <div className="h-inherit flex w-full flex-col text-gray-200">
      <div
        className={cn("flex flex-col-reverse overflow-auto", messagesHeight)}
      >
        <MessageContent type={type} messages={messages} />
      </div>
      <form
        className={cn(
          "flex h-[var(--message-box-height)] justify-center px-5 py-3",
          textareaHeight,
        )}
        onSubmit={onSubmit}
        ref={formRef}
      >
        <div className="relative w-full max-w-[800px]">
          <Textarea
            disabled={isLoading}
            value={inputMessage}
            className="bg-slate-800 pr-[50px] text-gray-200 outline-none"
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={textAreaKeyPressHandler}
          />
          <Button
            disabled={isLoading}
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
