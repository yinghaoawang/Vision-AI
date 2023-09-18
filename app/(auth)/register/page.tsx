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
      password
    };

    api.post('/register', {
      ...data
    }).then(cb => {
      console.log(cb);
    }).catch(error => {
      console.error(error);
    })

    // signIn('credentials', {
    //   ...data,
    //   redirect: false
    // }).then((callback) => {
    //   if (callback?.ok) {
    //     toast({
    //       title: 'Logged in'
    //     });
    //     router.push('/dashboard');
    //     router.refresh();
    //   } else {
    //     toast({
    //       title: 'Log in failed',
    //       description: callback?.error,
    //       variant: 'destructive'
    //     });
    //   }
    // });
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
