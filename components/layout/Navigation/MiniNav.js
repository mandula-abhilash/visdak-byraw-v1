"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLinks } from "./NavLinks";
import { cn } from "@/lib/utils";

export const MiniNav = ({ onExpand }) => {
  return (
    <nav className="hidden md:flex flex-col border-r bg-background w-[70px] transition-all duration-300">
      <div className="h-14 px-2 border-b flex items-center justify-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={onExpand}
          className="h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4 rotate-180" />
        </Button>
      </div>
      <NavLinks collapsed />
    </nav>
  );
};