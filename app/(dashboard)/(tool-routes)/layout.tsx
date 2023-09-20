import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const messagesHeight =
  'h-[calc(100vh-var(--message-box-height)-var(--navbar-height))]';

export default function ToolRoutesLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className='flex flex-col h-inherit w-full text-gray-200'>
      <div className={cn('overflow-auto', messagesHeight)}>{children}</div>
      <div className='flex justify-center px-5 py-3 h-[var(--message-box-height)] '>
        <Textarea
          className='bg-slate-800 text-gray-200 w-full max-w-[800px]'
          placeholder='Ask me anything'
        />
      </div>
    </div>
  );
}
