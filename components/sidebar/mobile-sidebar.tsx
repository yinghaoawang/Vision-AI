import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

const MobileSidebar = () => {
  return (
    <div className='flex bg-slate-500 md:hidden'>
      <div className='w-full border-t-[1px] border-slate-700 py-5 mx-5'>
        <Button>
          <Menu />
        </Button>
      </div>
    </div>
  );
};

export default MobileSidebar;
