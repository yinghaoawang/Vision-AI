'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, FormEvent } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import api from '@/app/_utils/api';

export default function RegisterPage() {
  const [email, setEmail] = useState('mail@mail.com');
  const [name, setName] = useState('person name');
  const [password, setPassword] = useState('password');
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      email,
      password,
      name
    };

    api
      .post('/api/register', {
        ...data
      })
      .then(() => {
        toast({
          title: 'Registration successful'
        });
        router.push('/dashboard');
        router.refresh();
      })
      .catch((error) => {
        toast({
          title: 'Registration failed',
          description: error?.response?.data?.message || error?.message,
          variant: 'destructive'
        });
      });
  };

  return (
    <>
      <div className='w-80 mx-auto p-10 bg-slate-500'>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Input
            type='name'
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button variant='default'>Sign up</Button>
        </form>
      </div>
    </>
  );
}
