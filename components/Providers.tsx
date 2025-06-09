
'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { TaskProvider } from '@/contexts/TaskContext';
import { TimeLogProvider } from '@/contexts/TimeLogContext'; 
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TaskProvider>
        <TimeLogProvider> 
          {children}
        </TimeLogProvider>
      </TaskProvider>
    </AuthProvider>
  );
}