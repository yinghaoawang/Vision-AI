import { cn } from '@/lib/utils';

const messages = [
  {
    id: 1,
    isUserMessage: true,
    content: 'Hey how do I do something?'
  },
  {
    id: 2,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 3,
    isUserMessage: false,
    content: 'this is how you do it'
  },
  {
    id: 4,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 5,
    isUserMessage: false,
    content: 'this is how you do it'
  },
  {
    id: 6,
    isUserMessage: true,
    content: 'Potential bug'
  },
  {
    id: 7,
    isUserMessage: false,
    content: 'this is how you do it'
  },
  // {
  //   id: 8,
  //   isUserMessage: true,
  //   content: 'Potential bug'
  // },
  // {
  //   id: 9,
  //   isUserMessage: false,
  //   content: 'this is how you do it'
  // },{
  //   id: 10,
  //   isUserMessage: true,
  //   content: 'Potential bug'
  // },
  // {
  //   id: 11,
  //   isUserMessage: false,
  //   content: 'this is how you do it'
  // }
];

export default function ChatPage() {
  return (
    <div className='w-full overflow-y-scroll'>
      {messages.map((message) => {
        const bgColor = message.isUserMessage && 'bg-slate-800';
        return (
          <div
            className={cn('flex w-full justify-center pt-6 pb-8 space-y-4', bgColor)}
            key={message.id}
          >
            <div className='w-full max-w-[800px] px-7 flex justify-center'>
              <h2 className='w-full'>Chat with AI</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
