'use client';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  FormEventHandler,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react';

const messagesHeight =
  'h-[calc(100vh-var(--message-box-height)-var(--navbar-height))]';

type Message = {
  id: number;
  isUserMessage: boolean;
  content: string;
};

const MessageContent = ({ messages }: { messages?: Message[] }) => {
  return (
    <div className='w-full '>
      {messages?.map((message) => {
        const bgColor = message.isUserMessage && 'bg-slate-800';
        return (
          <div
            className={cn(
              'flex w-full justify-center pt-6 pb-8 space-y-4',
              bgColor
            )}
            key={message.id}
          >
            <div className='w-full max-w-[800px] px-7 flex justify-center'>
              <h2 className='w-full'>{message.content}</h2>
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
  submitHandler
}: {
  messages?: Message[];
  submitHandler: FormEventHandler;
  inputMessage: string;
  setInputMessage: Dispatch<SetStateAction<string>>;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const textAreaKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey == false) {
      event.preventDefault();
      formRef?.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  const textAreaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setInputMessage(event.target.value);
  };

  return (
    <div className='flex flex-col h-inherit w-full text-gray-200'>
      <div className={cn('overflow-auto flex flex-col-reverse', messagesHeight)}>
        <MessageContent messages={messages} />
      </div>
      <form
        className='flex justify-center px-5 py-3 h-[var(--message-box-height)]'
        onSubmit={submitHandler}
        ref={formRef}
      >
        <Textarea
          value={inputMessage}
          className='bg-slate-800 text-gray-200 w-full max-w-[800px]'
          placeholder='Ask me anything'
          onChange={textAreaChangeHandler}
          onKeyDown={textAreaKeyPressHandler}
        />
      </form>
    </div>
  );
}
