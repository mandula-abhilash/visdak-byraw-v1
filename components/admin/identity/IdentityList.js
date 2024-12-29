"use client";

import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

export const IdentityList = ({ identities }) => {
  if (!identities?.length) return null;

  return (
    <div className="flex items-center gap-2">
      <Tag className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="flex flex-wrap gap-1.5">
        {identities.map((identity) => (
          <Badge
            key={identity.id}
            variant="secondary"
            className="px-2 py-0.5 text-xs font-medium"
          >
            {identity.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};
