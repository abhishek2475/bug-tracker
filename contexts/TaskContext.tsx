
'use client';


import React, { createContext, useState, useContext, ReactNode } from 'react'; 
import initialTasks from '@/data/task.json';


export interface Task {
    id: string;
    title: string;
    description: string;
    priority: "Low" | "Medium" | "High";
    status: "To Do" | "In Progress" | "Pending Approval" | "Closed";
    assigneeId: number | null;
    createdAt: string;
    updatedAt: string;
    closedAt?: string | null;
}


interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateTask: (taskId: string, updatedData: Partial<Task>) => void;
  deleteTask: (taskId:string) => void;
  getTaskById: (taskId: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);


export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks as Task[]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newTask: Task = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      status: 'To Do',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...taskData,
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const updateTask = (taskId: string, updatedData: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedData, updatedAt: new Date().toISOString() } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  const getTaskById = (taskId: string) => {
    return tasks.find(task => task.id === taskId);
  };

  const value = { tasks, addTask, updateTask, deleteTask, getTaskById };

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};