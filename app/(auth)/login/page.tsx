'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('mail@mail.com');
  const [password, setPassword] = useState('password');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      email,
      password
    };
    signIn('credentials', {
      ...data,
      redirect: false
    }).then((callback) => {
      if (callback?.ok) {
        toast({
          title: 'Logged in'
        });
        router.push('/dashboard');
        router.refresh();
      } else {
        toast({
          title: 'Log in failed',
          description: callback?.error,
          variant: 'destructive'
        });
      }
    });
  };

  return (
    <>
      <div className='w-80 mx-auto p-10 bg-slate-500'>
        <h1>Sign in</h1>
        <form className='flex flex-col gap-2 mt-2' onSubmit={handleSubmit}>
          <Input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className='flex justify-center gap-4'>
            <Button variant='default'>Log in</Button>
            <Button onClick={(event: FormEvent) => {
              event.preventDefault();
              router.push('/register');
            }} variant='link'>Sign Up</Button>
          </div>
        </form>
      </div>
    </>
  );
}
