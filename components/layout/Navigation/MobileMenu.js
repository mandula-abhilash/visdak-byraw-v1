"use client";

import { X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { Logo } from "../Logo";
import { useTheme } from "next-themes";

export const MobileMenu = ({ onClose }) => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="flex flex-col h-full bg-background border-l">
      <SheetHeader className="h-14 px-4 border-b flex items-center">
        <SheetTitle asChild>
          <div className="flex items-center justify-end w-full h-full">
            <SheetClose asChild>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetClose>
          </div>
        </SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-auto">
        <NavLinks onClick={onClose} />
        <div className="px-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full hover:bg-accent hover:text-accent-foreground text-muted-foreground"
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5 shrink-0" />
            ) : (
              <Moon className="h-5 w-5 shrink-0" />
            )}
            <span className="text-sm font-medium">Theme</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
