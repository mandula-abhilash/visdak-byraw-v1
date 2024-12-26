"use client";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Logo } from "./Logo";

export const Header = ({ children }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="md:hidden">
          {children}
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
