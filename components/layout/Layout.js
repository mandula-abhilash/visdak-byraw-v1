"use client";

import { DesktopNav } from "./Navigation/DesktopNav";
import { MobileNav } from "./Navigation/MobileNav";
import { Logo } from "./Logo";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <DesktopNav />
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="md:hidden sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center justify-between px-4">
            <Logo />
            <MobileNav />
          </div>
        </div>
        <main className="flex-1 overflow-auto">
          <div className="h-full p-4 md:p-6 lg:p-8 bg-background/95">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
