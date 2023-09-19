import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='grow flex'>
      <div className='hidden md:flex flex-col bg-slate-400 w-[300px]'>sidebar</div>
      <div className='flex'>contentd</div>
    </div>
  );
}
