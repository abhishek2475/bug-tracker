'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, LayoutDashboard } from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuth();


  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-white p-4 flex flex-col justify-between border-r">
      <div>
        <div className="flex items-center gap-2 mb-8">
          <LayoutDashboard className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold">BugTracker</h1>
        </div>
        <nav>
          <ul>
            <li>
              <Button variant="secondary" className="w-full justify-start">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </li>
            {/* Add more nav links here later (e.g., Settings) */}
          </ul>
        </nav>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={logout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </aside>
  );
}