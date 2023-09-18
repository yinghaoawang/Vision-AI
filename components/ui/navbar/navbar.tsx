import { User } from '@prisma/client';
import { Button } from '../button';
import UserMenu from './user-menu';

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
            <li>Log in</li>
            <li>Sign up</li>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
