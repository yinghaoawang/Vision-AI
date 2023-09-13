'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport
} from '@/components/ui/navigation-menu';

export default function Home() {
  return (
    <>
      Hello AI
      <Button variant='destructive'>Button</Button>
    </>
  );
}
