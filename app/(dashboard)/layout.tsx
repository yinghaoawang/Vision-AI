import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import MobileSidebar from '@/components/sidebar/mobile-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileSidebar />
      <div className='grow flex w-full'>
        <div className='hidden md:flex w-[300px]'>
          <Sidebar />
        </div>
        <div className='flex grow'>{children}</div>
      </div>
    </>
  );
}
