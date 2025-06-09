'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth(); 

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); 

    const success = await login(email, password);

    if (success) {
      router.push('/dashboard'); 
    } else {
      setError('Invalid email or password. Please try again.');
    }
    console.log('Login attempt:', { email, password });
    console.log("Error", error);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="login-email">Email</Label>
        <Input
          type="email"
          id="login-email"
          placeholder="yourcoolemail@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="login-password">Password</Label>
        <Input
          type="password"
          id="login-password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

      </div>

      {/* Display error message if it exists */}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full mt-2">
        Login
      </Button>
    </form>
  );
}