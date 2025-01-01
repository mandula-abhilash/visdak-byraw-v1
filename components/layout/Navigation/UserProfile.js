"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserProfile = ({ collapsed }) => {
  return (
    <div className="border-t">
      {collapsed ? (
        // Collapsed state - only show avatar
        <div className="flex justify-center p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.imgur.com/XLxbS7D.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-accent cursor-pointer">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="https://i.imgur.com/XLxbS7D.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            {/* Name with hover scrolling */}
            <div className="relative overflow-hidden">
              <p className="text-sm font-medium whitespace-nowrap hover:animate-[scroll_10s_linear_infinite]">
                Abhilash Mandula
              </p>
            </div>
            {/* Email with hover scrolling */}
            <div className="relative overflow-hidden mt-1">
              <p className="text-xs text-muted-foreground whitespace-nowrap hover:animate-[scroll_10s_linear_infinite]">
                mandula.abhilash@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
