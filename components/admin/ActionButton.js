"use client";

import { Button } from "@/components/ui/button";

export const ActionButton = ({
  icon: Icon,
  variant = "outline",
  onClick,
  className = "",
}) => {
  return (
    <Button
      variant={variant}
      size="icon"
      onClick={onClick}
      className={`h-8 w-8 flex items-center justify-center ${className}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};
