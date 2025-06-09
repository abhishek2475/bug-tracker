
'use client'; 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TaskCard } from '@/components/dashboard/TaskCard';
import { TrendChart } from '@/components/dashboard/TrendChart';
import { getConcurrentTasksData } from '@/lib/chart-utils';
import allUsers from '@/data/users.json';
import { useTasks, Task } from '@/contexts/TaskContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export default function DashboardClient() {

  const { user } = useAuth();
  const router = useRouter();
  const { tasks: allTasks } = useTasks();
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {

    if (user === null) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  let filteredTasks: Task[] = [];
    let dashboardTitle = '';

    
    if (user.role === 'Developer') {
      filteredTasks = allTasks.filter(
        (task) => task.assigneeId === user.id && task.status !== 'Closed'
      );
      dashboardTitle = "My Active Tasks";
    } else if (user.role === 'Manager') {
      filteredTasks = allTasks.filter((task) => task.status !== 'Closed');
      dashboardTitle = "All Open Tasks";
    }
    if (statusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }
    if (priorityFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }


    const tasksToShow = filteredTasks;

  
  const chartData = user.role === 'Manager' ? getConcurrentTasksData() : [];

  const getAssigneeName = (assigneeId: number | null) => {
    if (assigneeId === null) return "Unassigned";
    return allUsers.find(u => u.id === assigneeId)?.name || "Unknown User";
  };

  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-gray-500">Here what on your plate today.</p>
        </div>
        {user.role === 'Developer' && (
            <Link href="/dashboard/create">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Task
                </Button>
            </Link>
        )}
      </div>
      
      {/* Manager's Trend Chart */}
      {user.role === 'Manager' && (
        <Card>
            <CardHeader><CardTitle>Concurrent Task Trend</CardTitle></CardHeader>
            <CardContent><TrendChart data={chartData} /></CardContent>
        </Card>
      )}

      {/* Task List */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">{dashboardTitle}</h2>
        <div className="flex items-center gap-4">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="To Do">To Do</SelectItem>
                                <SelectItem value="In Progress">In Progress</SelectItem>
                                <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter by Priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Priorities</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
        {tasksToShow.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasksToShow.map(task => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        assigneeName={getAssigneeName(task.assigneeId)}
                    />
                ))}
            </div>
        ) : (
            <div className="text-center py-10 border-2 border-dashed rounded-lg">
                <p className="text-gray-500">No tasks to show. Youre all caught up!</p>
            </div>
        )}
      </div>
    </div>
  );
}