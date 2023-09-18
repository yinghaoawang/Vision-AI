'use client';
import { User } from '@prisma/client';
import { Button } from '../button';
import { signOut } from 'next-auth/react';

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  return (
    <>
      <li>Hello {currentUser?.name}!</li>
      <Button onClick={() => signOut()} variant='link'>
        Sign out
      </Button>
    </>
  );
};

export default UserMenu;
