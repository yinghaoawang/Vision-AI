import { User } from '@prisma/client';

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className='flex'>
      {currentUser && <li>Hello {currentUser.name}!</li>}
      <li>navbar item</li>
      <li>navbar item</li>
      <li>navbar item</li>
      <li>navbar item</li>
      <li>navbar item</li>
    </div>
  );
};

export default Navbar;
