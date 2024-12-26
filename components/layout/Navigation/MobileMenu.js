"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";

export const MobileMenu = ({ onClose }) => {
  return (
    <nav className="flex flex-col h-full bg-background border-l">
      <SheetHeader className="h-14 px-4 flex items-center">
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
      </div>
    </nav>
  );
};
