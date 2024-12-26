"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileMenu } from "./MobileMenu";

export const MobileNav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 right-0 md:hidden z-50">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="relative z-50">
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 transition-transform duration-200 ease-in-out relative z-50"
              style={{
                transform: open ? "translateX(-300px)" : "translateX(0)",
              }}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[350px] p-0 z-50 data-[state=open]:animate-reveal-menu data-[state=closed]:animate-hide-menu"
          >
            <MobileMenu onClose={() => setOpen(false)} />
          </SheetContent>
        </div>
      </Sheet>
    </div>
  );
};
