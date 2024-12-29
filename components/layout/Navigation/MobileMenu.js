"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { NavLinks } from "./NavLinks";
import { UserProfile } from "./UserProfile";

export const MobileMenu = ({ onClose }) => {
  return (
    <nav className="flex flex-col h-full bg-background border-l">
      <SheetHeader className="h-14 px-4 flex items-center">
        <SheetTitle asChild>
          <div className="flex items-center justify-end w-full h-full px-4">
            <SheetClose asChild />
          </div>
        </SheetTitle>
      </SheetHeader>
      <div className="flex-1 overflow-auto">
        <NavLinks onClick={onClose} />
      </div>
      <UserProfile />
    </nav>
  );
};
