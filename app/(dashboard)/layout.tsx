import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import MobileSidebar from '@/components/sidebar/mobile-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileSidebar />
      <div className='grow flex'>
        <Sidebar />
        <div className='flex'>{children}</div>
      </div>
    </>
  );
}
