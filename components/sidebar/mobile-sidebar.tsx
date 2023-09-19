import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Sidebar from './sidebar';

const SidebarButton = () => {
  return (
    <div className='flex md:hidden bg-inherit'>
      <div className='flex w-full border-t-[1px] border-slate-700 mx-5 min-h-[60px] items-center pl-4'>
        <Menu color='white' />
      </div>
    </div>
  );
};

const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SidebarButton />
      </SheetTrigger>
      <SheetContent side='left' className='p-0 w-[300px]'>
        <Sidebar className='pt-10' />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
