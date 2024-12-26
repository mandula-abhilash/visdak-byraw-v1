"use client";

import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./NavLinks";
import { Logo } from "../Logo";
import { cn } from "@/lib/utils";

export const DesktopNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={cn(
        "hidden md:flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]"
      )}
    >
      <div className="h-14 p-4 flex items-center justify-between">
        {!collapsed && <Logo />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("h-8 w-8", !collapsed && "ml-auto")}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>
      <NavLinks collapsed={collapsed} />
    </nav>
  );
};
