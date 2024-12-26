"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const UserProfile = ({ collapsed }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "border-t p-4",
        collapsed ? "flex flex-col items-center gap-4" : "space-y-4"
      )}
    >
      <div
        className={cn(
          "flex items-center",
          collapsed ? "flex-col gap-2" : "gap-3"
        )}
      >
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80&fit=crop" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">John Doe</p>
            <p className="text-xs text-muted-foreground truncate">
              john@example.com
            </p>
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={cn(
          "h-9 w-9 rounded-md transition-colors hover:bg-accent",
          collapsed && "mx-auto"
        )}
      >
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};
