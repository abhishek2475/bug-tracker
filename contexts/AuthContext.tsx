
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import users from '@/data/users.json'; 
interface User {
  id: number;
  name: string;
  email: string;
  role: 'Developer' | 'Manager';
}


interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  
  const login = async (email: string, password: string): Promise<boolean> => {
    
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {

      const { password: _, ...userToStore } = foundUser;
      setUser(userToStore as User);
      return true; 
    }

    setUser(null);
    return false;
  };

  const logout = () => {
    setUser(null);
    router.push('/'); 
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}