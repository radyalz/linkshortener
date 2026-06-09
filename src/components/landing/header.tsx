import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";

export function SiteHeader() {
  return (
    <div className="sticky top-0 z-20 px-0 py-4">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(#ffffff33,#ffffff26,#ffffff00)] dark:bg-[linear-gradient(#000,#000000b3,#0000)] backdrop-blur-lg dark:backdrop-blur-lg mask-[linear-gradient(#ffffff,#ffffffb3_55%,#ffffff00)] dark:mask-[linear-gradient(#000,#000000b3_65%,#0000)] h-28" />
      <header className="glass-panel relative z-10 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          <span className="gold-gradient-text">ShortLinks</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link href="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button asChild variant="outline" size="sm">
            <Link href="/login">Log in</Link>
          </Button>

          <Button asChild variant="gold" size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </header>
    </div>
  );
}
