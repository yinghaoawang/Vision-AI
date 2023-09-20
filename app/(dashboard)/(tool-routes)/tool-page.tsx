'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  KeyboardEvent,
  SetStateAction,
  useRef
} from 'react';
import { SendHorizonal } from 'lucide-react';

const messagesHeight =
  'h-[calc(100vh-var(--message-box-height)-var(--navbar-height))]';

type Message = {
  id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const MessageContent = ({ messages }: { messages?: Message[] }) => {
  return (
    <div className='w-full'>
      {messages?.map((message) => {
        const bgColor = message.role === 'user' ? 'bg-slate-800' : 'bg-inherit';
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

  const requestSubmitForm = () => {
    formRef?.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  const textAreaKeyPressHandler = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && event.shiftKey == false) {
      event.preventDefault();
      requestSubmitForm();
    }
  };

  const textAreaChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setInputMessage(event.target.value);
  };

  return (
    <div className='flex flex-col h-inherit w-full text-gray-200'>
      <div
        className={cn('overflow-auto flex flex-col-reverse', messagesHeight)}
      >
        <MessageContent messages={messages} />
      </div>
      <form
        className='flex justify-center px-5 py-3 h-[var(--message-box-height)]'
        onSubmit={submitHandler}
        ref={formRef}
      >
        <div className='w-full relative max-w-[800px]'>
          <Textarea
            value={inputMessage}
            className='bg-slate-800 text-gray-200 pr-[50px] outline-none'
            placeholder='Ask me anything'
            onChange={textAreaChangeHandler}
            onKeyDown={textAreaKeyPressHandler}
          />
          <Button
            className={cn(
              'h-[40px] w-[40px] p-0 absolute bottom-4 right-4 bg-transparent transition-colors duration-500 hover:bg-inherit',
              inputMessage.length > 0 && 'bg-green-600 hover:bg-green-700'
            )}
            onClick={(event) => {
              event.preventDefault();
              requestSubmitForm();
            }}
          >
            <SendHorizonal size='20' />
          </Button>
        </div>
      </form>
    </div>
  );
}
