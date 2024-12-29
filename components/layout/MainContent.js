"use client";

import { useLayout } from "@/lib/context/LayoutContext";
import { MobileNav } from "./Navigation/MobileNav";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

export const MainContent = ({ children }) => {
  const { isNavCollapsed } = useLayout();

  return (
    <div
      className={cn(
        "transition-[margin] duration-300 ease-in-out",
        isNavCollapsed ? "md:ml-[70px]" : "md:ml-[240px]"
      )}
    >
      <div className="md:hidden sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <Logo />
          <MobileNav />
        </div>
      </div>
      <main className="min-h-screen">
        <div className="h-full p-4 md:p-6 lg:p-8 bg-background/95">
          {children}
        </div>
      </main>
    </div>
  );
};
