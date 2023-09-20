import { cn } from '@/lib/utils';
import {
  Home,
  MessagesSquare,
  Image,
  Film,
  Disc3,
  Code,
  Cog
} from 'lucide-react';
import { Rubik } from 'next/font/google';
import Link from 'next/link';

export const tools = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    color: 'text-blue-500'
  },
  {
    label: 'Chat With AI',
    icon: MessagesSquare,
    href: '/chat',
    color: 'text-red-500'
  },
  {
    label: 'Generate Images',
    icon: Image,
    href: '/image',
    color: 'text-green-500'
  },
  {
    label: 'Generate Videos',
    icon: Film,
    href: '/video',
    color: 'text-orange-500'
  },
  {
    label: 'Generate Music',
    icon: Disc3,
    href: '/music',
    color: 'text-yellow-500'
  },
  {
    label: 'Generate Code',
    icon: Code,
    href: '/code',
    color: 'text-violet-500'
  },
  {
    label: 'Settings',
    icon: Cog,
    href: '/settings',
    color: 'text-gray-200'
  }
];

const sidebarHeight = 'h-[calc(100vh-var(--navbar-height))]';

const linkFont = Rubik({
  subsets: ['latin']
});

export default function Sidebar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-col bg-slate-950/90 w-full h-full space-y-1 py-5 overflow-auto',
        sidebarHeight,
        className
      )}
    >
      {tools.map((route) => {
        return (
          <Link
            className={cn(
              'flex hover:bg-white/10 px-3 pl-6 min-h-[55px] items-center text-white text-sm',
              linkFont
            )}
            href={route.href}
            key={route.label}
          >
            <route.icon className={cn('mr-4', route.color)} /> {route.label}
          </Link>
        );
      })}
    </div>
  );
}
