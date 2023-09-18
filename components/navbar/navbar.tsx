import { User } from '@prisma/client';
import { Button } from '../ui/button';
import UserMenu from './user-menu';
import Link from 'next/link';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex'>
        <li>navbar item</li>
        <li>navbar item</li>
        <li>navbar item</li>
        <li>navbar item</li>
        <li>navbar item</li>
      </div>
      <div className='flex items-center'>
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
