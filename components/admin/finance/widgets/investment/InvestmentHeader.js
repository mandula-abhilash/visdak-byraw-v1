"use client";

import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const InvestmentHeader = ({ title, description, onAdd }) => {
  return (
    <CardHeader className="pb-3 flex-none border-b">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add investment</span>
        </Button>
      </div>
    </CardHeader>
  );
};
