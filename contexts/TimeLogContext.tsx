'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface TimeLog {
    id: string;
    taskId: string;
    userId: number;
    timeSpent: number; 
    logDate: string;
    note: string;
}

interface TimeLogContextType {
  timeLogs: TimeLog[];
  addTimeLog: (logData: Omit<TimeLog, 'id' | 'logDate'>) => void;
  getLogsForTask: (taskId: string) => TimeLog[];
  getTotalTimeForTask: (taskId: string) => number;
}

const TimeLogContext = createContext<TimeLogContextType | undefined>(undefined);


const initialLogs: TimeLog[] = [
    { id: 'TL-001', taskId: 'TSK-001', userId: 1, timeSpent: 120, logDate: new Date().toISOString(), note: 'Initial implementation and styling.'},
    { id: 'TL-002', taskId: 'TSK-001', userId: 1, timeSpent: 45, logDate: new Date().toISOString(), note: 'Fixed alignment issues.'},
];

export function TimeLogProvider({ children }: { children: ReactNode }) {
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>(initialLogs);

  const addTimeLog = (logData: Omit<TimeLog, 'id' | 'logDate'>) => {
    const newLog: TimeLog = {
      id: `TL-${Math.random().toString(36).substr(2, 5)}`,
      logDate: new Date().toISOString(),
      ...logData,
    };
    setTimeLogs(prev => [newLog, ...prev]);
  };

  const getLogsForTask = (taskId: string) => {
    return timeLogs.filter(log => log.taskId === taskId);
  };

  const getTotalTimeForTask = (taskId: string) => {
    return timeLogs
      .filter(log => log.taskId === taskId)
      .reduce((total, log) => total + log.timeSpent, 0);
  };

  return (
    <TimeLogContext.Provider value={{ timeLogs, addTimeLog, getLogsForTask, getTotalTimeForTask }}>
      {children}
    </TimeLogContext.Provider>
  );
}

export const useTimeLogs = () => {
  const context = useContext(TimeLogContext);
  if (context === undefined) {
    throw new Error('useTimeLogs must be used within a TimeLogProvider');
  }
  return context;
};