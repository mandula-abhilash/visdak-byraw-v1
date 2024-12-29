"use client";

import { createContext, useContext, useState } from "react";

const LayoutContext = createContext({
  isNavCollapsed: false,
  toggleNav: () => {},
});

export const LayoutProvider = ({ children }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleNav = () => setIsNavCollapsed((prev) => !prev);

  return (
    <LayoutContext.Provider value={{ isNavCollapsed, toggleNav }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
