'use client';

import { Brain } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

export const Header = ({ children }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <div className="flex items-center gap-2 md:hidden">
          {children}
          <Brain className="h-6 w-6" />
          <span className="font-bold">Virtual Assistant</span>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};