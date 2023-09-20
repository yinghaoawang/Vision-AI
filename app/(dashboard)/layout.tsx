import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import MobileSidebar from '@/components/sidebar/mobile-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='grow flex w-full'>
        <div className='hidden md:flex w-[250px] flex-shrink-0'>
          <Sidebar />
        </div>
        <div className='flex grow'>{children}</div>
      </div>
    </>
  );
}
