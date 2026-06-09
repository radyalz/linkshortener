"use client";

import { useEffect, useState, useTransition } from "react";
import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";

import { setThemeAction, type AppTheme } from "@/lib/actions/theme";
import { Button } from "@/components/ui/button";

function readThemeFromDom(): AppTheme {
  if (typeof document === "undefined") {
    return "dark";
  }

  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function ThemeToggle() {
  const router = useRouter();
  const [theme, setTheme] = useState<AppTheme>("dark");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setTheme(readThemeFromDom());
  }, []);

  function handleToggle() {
    const nextTheme: AppTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(nextTheme);

    startTransition(async () => {
      await setThemeAction(nextTheme);
      router.refresh();
    });
  }

  const isDark = theme === "dark";

  return (
    <Button type="button" variant="outline" size="icon" onClick={handleToggle} disabled={isPending} aria-label="Toggle color theme">
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
