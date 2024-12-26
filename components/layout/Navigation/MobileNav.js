"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetOverlay,
} from "@/components/ui/sheet";
import { MobileMenu } from "./MobileMenu";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="fixed inset-y-0 left-0 h-full w-[300px] sm:w-[350px] p-0 z-[100]"
      >
        <MobileMenu onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};
