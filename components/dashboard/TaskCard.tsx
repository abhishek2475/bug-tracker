
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from "@/lib/utils"; 
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks } from '@/contexts/TaskContext';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';


type Task = {
    id: string;
    title: string;
    priority: "High" | "Medium" | "Low";
    status: "To Do" | "In Progress" | "Pending Approval" | "Closed";
};


interface TaskCardProps {
    task: Task; 
    assigneeName: string;
}

// Helper to get initials from name
const getInitials = (name: string) => name.split(' ').map((n) => n[0]).join('');

export function TaskCard({ task, assigneeName }: TaskCardProps) {
  const { user } = useAuth();
  const { updateTask, deleteTask } = useTasks();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  return (
    <>
    <Link href={`/dashboard/task/${task.id}`} className="no-underline text-current">
      <Card className="flex flex-col justify-between hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold pr-2">{task.title}</CardTitle>
            {user?.role === 'Developer' && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={`/dashboard/task/${task.id}/edit`}>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => setIsAlertOpen(true)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <Badge variant={
                        task.priority === "High" ? "destructive" :
                        task.priority === "Medium" ? "secondary" : "outline"
                    }>
            {task.priority}
          </Badge>
        </CardHeader>
        <CardContent>
           <Badge 
                  className={cn(
                    "text-xs",
                    task.status === "To Do" && "bg-gray-200 text-gray-800",
                    task.status === "In Progress" && "bg-blue-200 text-blue-800",
                    task.status === "Pending Approval" && "bg-yellow-200 text-yellow-800",
                    task.status === "Closed" && "bg-green-200 text-green-800"
                  )}
                >
                  {task.status}
                </Badge>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4 pt-4">
    <div className="flex justify-between items-center w-full">
        <span className="text-sm text-gray-500">Task ID: {task.id}</span>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{assigneeName}</span>
            <Avatar className="h-6 w-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${assigneeName}`} />
                <AvatarFallback>{getInitials(assigneeName)}</AvatarFallback>
            </Avatar>
        </div>
    </div>
    
    {/* --- WORKFLOW ACTIONS --- */}
    <div className="w-full">
        {/* Developer's action */}
        {user?.role === 'Developer' && task.status === 'In Progress' && (
            <Button 
              className="w-full" 
              onClick={() => updateTask(task.id, { status: 'Pending Approval' })}>
                Close for Approval
            </Button>
        )}

        {/* Manager's actions */}
        {user?.role === 'Manager' && task.status === 'Pending Approval' && (
            <div className="flex gap-2 w-full">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => updateTask(task.id, { status: 'In Progress' })}>
                    Re-open Task
                </Button>
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  onClick={() => updateTask(task.id, { status: 'Closed', closedAt: new Date().toISOString() })}>
                    Approve Closure
                </Button>
            </div>
        )}
    </div>
    </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task &ldquo;{task.title}&ldquo;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteTask(task.id)} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </Link>
    </>
  );
}