import { Home, MessagesSquare, Image, Film, Disc3, Code } from 'lucide-react';
import Link from 'next/link';

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/dashboard',
    color: 'text-blue-500'
  },
  {
    label: 'Chat With Me',
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
  }
];

export default function Sidebar() {
  return (
    <div className='hidden md:flex flex-col space-y-5 bg-slate-400 w-[300px] px-5 py-5'>
      {routes.map((route) => {
        return (
          <Link className='flex' href={route.href} key={route.label}>
            <route.icon className={`${route.color} mr-3`} /> {route.label}
          </Link>
        );
      })}
    </div>
  );
}
