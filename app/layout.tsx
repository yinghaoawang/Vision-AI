import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar/navbar';
import getCurrentUser from './_actions/getCurrentUser';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={`bg-slate-800 ${inter.className}`}>
        <Navbar currentUser={currentUser} />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
