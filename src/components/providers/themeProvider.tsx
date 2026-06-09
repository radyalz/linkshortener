"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import type { AppTheme } from "@/lib/actions/theme";

export function ThemeProvider({ children, forcedTheme }: { children: React.ReactNode; forcedTheme: AppTheme }) {
  return (
    <NextThemesProvider attribute="class" forcedTheme={forcedTheme} enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
