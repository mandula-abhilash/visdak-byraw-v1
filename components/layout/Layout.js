"use client";

import { DesktopNav } from "./Navigation/DesktopNav";
import { MobileNav } from "./Navigation/MobileNav";
import { Logo } from "./Logo";
import { LayoutProvider } from "@/lib/context/LayoutContext";
import { MainContent } from "./MainContent";

export const Layout = ({ children }) => {
  return (
    <LayoutProvider>
      <div className="min-h-screen">
        <DesktopNav />
        <MainContent>{children}</MainContent>
      </div>
    </LayoutProvider>
  );
};
