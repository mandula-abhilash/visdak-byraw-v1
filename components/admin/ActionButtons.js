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
        w-full md:w-auto
        flex items-center justify-center gap-2
        ${
          destructive
            ? "hover:bg-destructive/10 hover:text-destructive"
            : "hover:bg-primary/10"
        }
        ${className}
      `}
    >
      <span className="">{label}</span>
      <Icon className="hidden md:inline-block h-4 w-4" />
    </Button>
  );
};

export const ActionButtonGroup = ({ children, className = "" }) => {
  const buttonArray = Array.isArray(children) ? children : [children];

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 gap-2 md:flex md:flex-row md:gap-2">
        {buttonArray}
      </div>
    </div>
  );
};
