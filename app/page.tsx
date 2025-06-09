// /app/page.tsx
'use client'; // This is required because we're using hooks like useState

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal/AuthModal'; // We will create this next

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">BugTracker</h1>
        <div className="space-x-2">
          <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
            Login
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>Sign Up</Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900">
          Streamline Your Workflow
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          The ultimate bug and task tracker for modern development teams.
          Collaborate, track, and resolve issues with ease.
        </p>
        <Button size="lg" className="mt-8" onClick={() => setIsModalOpen(true)}>
          Get Started
        </Button>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 border-t">
        <p>© {new Date().getFullYear()} BugTracker. All rights reserved.</p>
      </footer>

      {/* The Authentication Modal */}
      <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
}