
'use client';

import { useTasks } from '@/contexts/TaskContext';
import { useTimeLogs } from '@/contexts/TimeLogContext';
import { useAuth } from '@/contexts/AuthContext';
import allUsers from '@/data/users.json';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const formatTime = (minutes: number) => {
    if (minutes === 0) return "0m";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h > 0 ? `${h}h ` : ''}${m > 0 ? `${m}m` : ''}`.trim();
}

export default function TaskDetailPage({ params }: { params: { taskId: string } }) {
    const { user } = useAuth();
    const { getTaskById } = useTasks();
    const { getLogsForTask, addTimeLog, getTotalTimeForTask } = useTimeLogs();
    
    const [time, setTime] = useState('');
    const [note, setNote] = useState('');

    const task = getTaskById(params.taskId);
    const timeLogs = getLogsForTask(params.taskId);
    const totalTime = getTotalTimeForTask(params.taskId);

    if (!task || !user) {
        return <div>Loading task details...</div>;
    }
    
    const handleLogTime = (e: React.FormEvent) => {
        e.preventDefault();
        const timeInMinutes = parseInt(time);
        if (isNaN(timeInMinutes) || timeInMinutes <= 0) {
            alert("Please enter a valid number of minutes.");
            return;
        }
        addTimeLog({
            taskId: task.id,
            userId: user.id,
            timeSpent: timeInMinutes,
            note: note,
        });
        setTime('');
        setNote('');
    };

    const assigneeName = allUsers.find(u => u.id === task.assigneeId)?.name || "Unassigned";

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column: Task Details */}
            <div className="md:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                           <Badge>{task.status}</Badge>
                           <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge>
                        </div>
                        <p><strong>Assignee:</strong> {assigneeName}</p>
                        <p><strong>Total Time Logged:</strong> {formatTime(totalTime)}</p>
                    </CardContent>
                </Card>

                {/* Time Logging Form */}
                <Card>
                    <CardHeader><CardTitle>Log Time</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogTime} className="space-y-4">
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="time">Time Spent (in minutes)</Label>
                                <Input id="time" type="number" value={time} onChange={e => setTime(e.target.value)} placeholder="e.g., 60" required />
                            </div>
                            <div className="grid w-full items-center gap-1.5">
                                <Label htmlFor="note">Note</Label>
                                <Textarea id="note" value={note} onChange={e => setNote(e.target.value)} placeholder="What did you work on?" required />
                            </div>
                            <Button type="submit">Log Time</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Time Log History */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Time Log History</h3>
                {timeLogs.length > 0 ? (
                    timeLogs.map(log => {
                        const logUser = allUsers.find(u => u.id === log.userId)?.name || "Unknown";
                        return (
                            <Card key={log.id}>
                                <CardContent className="pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold">{logUser}</p>
                                        <p className="font-bold text-lg">{formatTime(log.timeSpent)}</p>
                                    </div>
                                    <p className="text-sm text-gray-600">{log.note}</p>
                                    <p className="text-xs text-gray-400 mt-2">{new Date(log.logDate).toLocaleString()}</p>
                                </CardContent>
                            </Card>
                        )
                    })
                ) : (
                    <p className="text-sm text-gray-500">No time logged for this task yet.</p>
                )}
            </div>
        </div>
    );
}