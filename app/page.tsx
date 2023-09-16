'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect, FormEvent } from 'react';

export default function Home() {
  const [email, setEmail] = useState('mail@mail.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(email, password);
    event.preventDefault();
  };

  return (
    <>
      <div className='w-80 mx-auto p-10 bg-slate-500'>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
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
          <Button variant='default'>Log in</Button>
        </form>
      </div>
    </>
  );
}
