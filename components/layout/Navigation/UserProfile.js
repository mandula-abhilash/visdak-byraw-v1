"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserProfile = ({ collapsed }) => {
  return (
    <div className="border-t">
      {collapsed ? (
        // Collapsed state - only show avatar
        <div className="flex justify-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.imgur.com/XLxbS7D.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        // Expanded state - show full profile
        <div className="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-accent cursor-pointer">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="https://i.imgur.com/XLxbS7D.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium leading-none truncate">
              Abhilash Mandula
            </p>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              mandula.abhilash@gmail.com
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
