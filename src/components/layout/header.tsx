import Link from "next/link";
import { signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth/server";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { HeaderClient } from "@/components/layout/headerClient";
import { HeaderVisibility } from "@/components/layout/headerVisibility";

export async function Header() {
  const { data: session } = await auth.getSession();
  const isLoggedIn = Boolean(session?.user);
  return (
    <HeaderVisibility>
      <div className="sticky top-0 z-20 px-0 py-4 mx-2">
        <div className="pointer-events-none absolute inset-0 h-28 bg-[linear-gradient(#ffffff33,#ffffff26,#ffffff00)] backdrop-blur-lg mask-[linear-gradient(#ffffff,#ffffffb3_55%,#ffffff00)] dark:bg-[linear-gradient(#000,#000000b3,#0000)] dark:backdrop-blur-lg dark:mask-[linear-gradient(#000,#000000b3_65%,#0000)]" />
        <header className="glass-panel relative z-10 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md">
          <div className="flex flex-1 items-center gap-1 md:flex-none">
            <div className="md:hidden">
              <HeaderClient isLoggedIn={isLoggedIn} />
            </div>

            <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight">
              <span className="gold-gradient-text">ShortLinks</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <HeaderClient isLoggedIn={isLoggedIn} />
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            {isLoggedIn ? (
              <form action={signOutAction} className="contents">
                <Button
                  type="submit"
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-lg border border-amber-500/20 bg-amber-400/10 px-3 text-xs font-medium text-amber-900 shadow-sm shadow-amber-950/5 transition-all hover:border-amber-500/30 hover:bg-amber-400/15 hover:text-amber-950 dark:text-amber-100 dark:hover:text-amber-50"
                >
                  Log out
                </Button>
              </form>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 rounded-lg border border-amber-500/20 bg-amber-400/10 px-3 text-xs font-medium text-amber-900 shadow-sm shadow-amber-950/5 transition-all hover:border-amber-500/30 hover:bg-amber-400/15 hover:text-amber-950 dark:text-amber-100 dark:hover:text-amber-50"
              >
                <Link href="/authentication">Login / Sign up</Link>
              </Button>
            )}
          </div>
        </header>
      </div>
    </HeaderVisibility>
  );
}
