"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./NavLinks";
import { Logo } from "../Logo";
import { cn } from "@/lib/utils";
import { MiniNav } from "./MiniNav";
import { UserProfile } from "./UserProfile";

export const DesktopNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return <MiniNav onExpand={() => setCollapsed(false)} />;
  }

  return (
    <nav className="hidden md:flex flex-col border-r bg-background w-[240px] fixed top-0 bottom-0 left-0">
      <div className="h-14 px-4 flex items-center justify-between">
        <Logo />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(true)}
          className="h-8 w-8 ml-auto"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1">
        <NavLinks />
      </div>
      <UserProfile />
    </nav>
  );
};
