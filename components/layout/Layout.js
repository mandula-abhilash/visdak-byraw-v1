"use client";

import { Header } from "./Header";
import { MobileNav } from "./Navigation/MobileNav";
import { DesktopNav } from "./Navigation/DesktopNav";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <DesktopNav />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header>
          <MobileNav />
        </Header>
        <main className="flex-1 overflow-auto">
          <div className="h-full p-4 md:p-6 lg:p-8 bg-background/95">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
