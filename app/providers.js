"use client";

import { ThemeProvider } from "next-themes";
import { GoogleMapsProvider } from "@/lib/providers/GoogleMapsProvider";

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <GoogleMapsProvider>{children}</GoogleMapsProvider>
    </ThemeProvider>
  );
}
