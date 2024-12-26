"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { Logo } from "../Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <nav className="flex flex-col h-full bg-background">
          <div className="h-14 p-4 border-b flex items-center justify-between">
            <Logo />
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1">
            <NavLinks onClick={() => setOpen(false)} />
          </div>
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};
