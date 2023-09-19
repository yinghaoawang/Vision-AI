import { User } from '@prisma/client';
import { Button } from '../ui/button';
import UserMenu from './user-menu';
import Link from 'next/link';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className='flex items-center justify-between px-10 bg-slate-900 min-h-[60px] w-full text-white'>
      <div className='flex gap-10'>
        <Link href='/dashboard'>Home</Link>
        <Link href='/photos'>Photos</Link>
      </div>
      <div className='flex items-center gap-10'>
        {currentUser && <UserMenu currentUser={currentUser} />}
        {!currentUser && (
          <>
            <Link href='/login'>
              Log in
            </Link>
            <Link href='/register'>Sign up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
