"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { Logo } from "../Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const MobileMenu = ({ onClose }) => {
  return (
    <SheetContent side="left" className="w-[300px] p-0">
      <nav className="flex flex-col h-full bg-background">
        <SheetHeader className="h-14 px-4 border-b flex items-center">
          <SheetTitle asChild>
            <div className="flex items-center justify-between w-full">
              <Logo />
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          <NavLinks onClick={onClose} />
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </SheetContent>
  );
};
