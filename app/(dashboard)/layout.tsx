import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='grow flex w-full bg-slate-700 '>
        <div className='hidden md:flex w-[250px] flex-shrink-0'>
          <Sidebar />
        </div>
        <div className='grow flex'>{children}</div>
      </div>
    </>
  );
}
