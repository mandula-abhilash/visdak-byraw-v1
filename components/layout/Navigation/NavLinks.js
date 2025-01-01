"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import * as Icons from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const SubNavItem = ({ subItem, onClick, isActive }) => {
  const IconComponent = Icons[subItem.icon];

  return (
    <Link
      key={subItem.id}
      href={subItem.path}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive
          ? "bg-secondary text-secondary-foreground"
          : "text-muted-foreground"
      )}
    >
      {IconComponent && <IconComponent className="h-4 w-4 shrink-0" />}
      <span className="text-sm font-medium">{subItem.label}</span>
    </Link>
  );
};

export const NavLinks = ({ collapsed, onClick }) => {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState({
    widgets: true,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpanded = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const renderNavItem = (item) => {
    const IconComponent = Icons[item.icon];
    const isActive = pathname === item.path;
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedItems[item.id];

    const handleClick = (e) => {
      if (item.isThemeToggle) {
        e.preventDefault();
        setTheme(theme === "light" ? "dark" : "light");
      } else if (hasSubItems) {
        e.preventDefault();
        toggleExpanded(item.id);
      }
      if (!hasSubItems) {
        onClick?.();
      }
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
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors w-full",
            "hover:bg-accent hover:text-accent-foreground",
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
      <div key={item.id}>
        <Link
          href={hasSubItems ? "#" : item.path}
          onClick={handleClick}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            isActive
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground",
            collapsed && "justify-center px-2"
          )}
        >
          {IconComponent && <IconComponent className="h-5 w-5 shrink-0" />}
          {!collapsed && (
            <div className="flex flex-1 items-center justify-between">
              <span className="text-sm font-medium">{item.label}</span>
              {hasSubItems && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-180"
                  )}
                />
              )}
            </div>
          )}
        </Link>
        {hasSubItems && isExpanded && !collapsed && (
          <div className="ml-6 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <SubNavItem
                key={subItem.id}
                subItem={subItem}
                onClick={onClick}
                isActive={pathname === subItem.path}
              />
            ))}
          </div>
        )}
      </div>
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
