// lib/chart-utils.ts
import allTasks from '@/data/task.json';

type Task = typeof allTasks[0] & { closedAt?: string };

export const getConcurrentTasksData = (days: number = 30) => {
  const chartData: { date: string; "Concurrent Tasks": number }[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    let concurrentTasks = 0;
    
    for (const task of allTasks as Task[]) {
      const createdAt = new Date(task.createdAt);
      // A task is considered "active" on a given day if:
      // 1. It was created on or before that day.
      // 2. It was not closed, OR it was closed after that day.
      
      const isCreated = createdAt <= date;
      const isClosed = task.closedAt ? new Date(task.closedAt) < date : false;

      if (isCreated && !isClosed) {
        concurrentTasks++;
      }
    }
    
    chartData.push({ date: formattedDate, "Concurrent Tasks": concurrentTasks });
  }

  return chartData;
};