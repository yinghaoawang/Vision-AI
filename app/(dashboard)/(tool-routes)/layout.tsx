import { Textarea } from '@/components/ui/textarea';
import { ReactNode } from 'react';

export default function ToolRoutesLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <div className='flex flex-col h-inherit w-full text-gray-200'>
      <div>{children}</div>
      <div className='flex justify-center px-5 py-3'>
        <Textarea
          className='bg-slate-800 text-gray-200 w-full max-w-[700px]'
          placeholder='Ask me anything'
        />
      </div>
    </div>
  );
}
