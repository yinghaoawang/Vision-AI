import { User } from '@prisma/client';
import { Button } from '../ui/button';
import UserMenu from './user-menu';
import Link from 'next/link';
import MobileSidebar from '../sidebar/mobile-sidebar';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className='bg-slate-950 flex flex-col'>
      <div className='hidden md:flex items-center justify-between px-10 h-[var(--navbar-height)] w-full text-white'>
        <div className='flex gap-10'>
          <Link href='/dashboard'>Home</Link>
        </div>
        <div className='flex items-center gap-10'>
          {currentUser && <UserMenu currentUser={currentUser} />}
          {!currentUser && (
            <>
              <Link href='/login'>Log in</Link>
              <Link href='/register'>Sign up</Link>
            </>
          )}
        </div>
      </div>
      <MobileSidebar />
    </div>
  );
};

export default Navbar;
