"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const UserProfile = ({ collapsed }) => {
  return (
    <div
      className={cn(
        "border-t p-4",
        collapsed ? "flex flex-col items-center" : "space-y-2"
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
    </div>
  );
};
