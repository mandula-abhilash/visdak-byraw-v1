"use client";

import { Badge } from "@/components/ui/badge";

export const IdentityList = ({ identities }) => {
  if (!identities?.length) return null;

  return (
    <div className="flex flex-wrap gap-2 bg-primary-foreground">
      {identities.map((identity) => (
        <Badge key={identity.id} variant="secondary" className="px-2 py-1">
          {identity.label}
        </Badge>
      ))}
    </div>
  );
};