"use client";

import { useRef, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const UserProfile = ({ collapsed }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [nameOverflows, setNameOverflows] = useState(false);
  const [emailOverflows, setEmailOverflows] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (nameRef.current) {
        setNameOverflows(
          nameRef.current.scrollWidth > nameRef.current.clientWidth
        );
      }
      if (emailRef.current) {
        setEmailOverflows(
          emailRef.current.scrollWidth > emailRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

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
        // Expanded state - show full profile with conditional scrolling text
        <div className="flex items-center gap-3 p-2 rounded-md transition-colors hover:bg-accent cursor-pointer">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarImage src="https://i.imgur.com/XLxbS7D.jpg" />
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            {/* Name with conditional scrolling */}
            <div className="relative overflow-hidden">
              <p
                ref={nameRef}
                className={cn(
                  "text-sm font-medium whitespace-nowrap",
                  nameOverflows && "hover:animate-[scroll_10s_linear_infinite]"
                )}
              >
                Abhilash Mandula
              </p>
            </div>
            {/* Email with conditional scrolling */}
            <div className="relative overflow-hidden mt-1">
              <p
                ref={emailRef}
                className={cn(
                  "text-xs text-muted-foreground whitespace-nowrap",
                  emailOverflows && "hover:animate-[scroll_10s_linear_infinite]"
                )}
              >
                mandula.abhilash@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
