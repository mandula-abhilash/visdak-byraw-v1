'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

export const NavLinks = ({ collapsed, className = '', onClick }) => {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col gap-1 p-2', className)}>
      {NAV_ITEMS.map((item) => {
        const Icon = Icons[item.icon];
        const isActive = pathname === item.path;

        return (
          <Link
            key={item.id}
            href={item.path}
            onClick={onClick}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              isActive ? 'bg-secondary text-secondary-foreground' : 'text-muted-foreground',
              collapsed && 'justify-center px-2'
            )}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
          </Link>
        );
      })}
    </div>
  );
};