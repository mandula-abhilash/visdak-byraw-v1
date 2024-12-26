"use client";

import { Button } from "@/components/ui/button";

export const ActionButton = ({
  icon: Icon,
  label,
  variant = "outline",
  onClick,
  className = "",
  destructive = false,
}) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        ${
          destructive
            ? "hover:bg-destructive/10 hover:text-destructive"
            : "hover:bg-primary/10"
        }
        ${className}
      `}
    >
      <span className="hidden md:inline-block">{label}</span>
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export const ActionButtonGroup = ({ children, className = "" }) => {
  return (
    <div className={`flex flex-wrap md:justify-end gap-2 ${className}`}>
      {children}
    </div>
  );
};
