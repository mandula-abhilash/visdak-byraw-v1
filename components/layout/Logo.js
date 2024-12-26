"use client";

import { Brain } from "lucide-react";

export const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 h-9 ${className}`}>
      <Brain className="h-5 w-5" />
      <span className="font-bold text-lg">BYRAW</span>
    </div>
  );
};
