"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as Icons from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const NavLinks = ({ collapsed, onClick }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderNavItem = (item) => {
    const Icon = Icons[item.icon];
    const isActive = pathname === item.path;

    const handleClick = (e) => {
      if (item.isThemeToggle) {
        e.preventDefault();
        setTheme(theme === "light" ? "dark" : "light");
      }
      onClick?.();
    };

    if (item.isThemeToggle) {
      if (!mounted) {
        return (
          <div
            key={item.id}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md",
              "text-muted-foreground",
              collapsed && "justify-center px-2"
            )}
          >
            <div className="h-5 w-5" />
            {!collapsed && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </div>
        );
      }

      return (
        <button
          key={item.id}
          onClick={handleClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
            "hover:bg-accent hover:text-accent-foreground w-full",
            "text-muted-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          {theme === "dark" ? (
            <Icons.Moon className="h-5 w-5 shrink-0" />
          ) : (
            <Icons.Sun className="h-5 w-5 shrink-0" />
          )}
          {!collapsed && (
            <span className="text-sm font-medium">{item.label}</span>
          )}
        </button>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.path}
        onClick={onClick}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive
            ? "bg-secondary text-secondary-foreground"
            : "text-muted-foreground",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && (
          <span className="text-sm font-medium">{item.label}</span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-1 p-2">
      {NAV_ITEMS.map((section, index) => (
        <div
          key={section.section}
          className={cn("space-y-1", index !== 0 && "mt-4")}
        >
          {section.section && !collapsed && (
            <h4 className="px-3 py-2 text-sm font-semibold text-foreground/70">
              {section.section}
            </h4>
          )}
          {section.items.map(renderNavItem)}
        </div>
      ))}
    </div>
  );
};
