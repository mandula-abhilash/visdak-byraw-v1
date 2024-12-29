"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./NavLinks";
import { Logo } from "../Logo";
import { MiniNav } from "./MiniNav";
import { UserProfile } from "./UserProfile";
import { useLayout } from "@/lib/context/LayoutContext";

export const DesktopNav = () => {
  const { isNavCollapsed, toggleNav } = useLayout();

  if (isNavCollapsed) {
    return <MiniNav onExpand={toggleNav} />;
  }

  return (
    <nav className="hidden md:block fixed top-0 left-0 bottom-0 w-[240px] border-r bg-background z-40">
      <div className="flex flex-col h-full">
        <div className="h-14 px-4 flex items-center">
          <Logo />
        </div>
        <div className="flex-1 overflow-auto">
          <NavLinks />
        </div>
        <UserProfile />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleNav}
          className="h-8 w-8 absolute -right-4 top-10 bg-background border rounded-full shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
};
