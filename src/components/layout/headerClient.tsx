"use client";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/layout/navItems";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type HeaderNavClientProps = {
  isLoggedIn: boolean;
};

export function HeaderClient({ isLoggedIn }: HeaderNavClientProps) {
  const pathname = usePathname();
  const visibleNavItems = navItems.filter((item) => {
    if (item.href === "/dashboard") {
      return isLoggedIn;
    }
    return true;
  });
  const activeIndex = visibleNavItems.findIndex((item) => item.isActive(pathname));
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const itemWidth = `${100 / visibleNavItems.length}%`;
  return (
    <>
      <nav className="relative hidden gap-2 rounded-sm bg-muted/40 p-1 md:flex">
        <span
          className="absolute bottom-1 top-1 rounded-lg bg-purple-950 transition-all duration-300 ease-out"
          style={{
            width: `calc(${itemWidth} - 0.3rem)`,
            transform: `translateX(${safeActiveIndex * 100}%)`,
          }}
        />
        {visibleNavItems.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className={cn(
                "relative z-10 flex h-8 min-w-24 items-center justify-center rounded-lg px-4 text-sm font-medium transition-all duration-200",
                active ? "text-purple-50" : "text-purple-900/60 hover:bg-purple-400/10 hover:text-purple-950 dark:text-purple-200/60 dark:hover:bg-purple-300/10 dark:hover:text-purple-50",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 rounded-lg text-purple-900/70 hover:bg-purple-400/10 hover:text-purple-950 md:hidden dark:text-purple-200/70 dark:hover:bg-purple-300/10 dark:hover:text-purple-50"
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-44 rounded-xl border-border/60 bg-background/95 p-1 shadow-xl shadow-purple-950/10 backdrop-blur">
          {visibleNavItems.map((item) => {
            const active = item.isActive(pathname);
            return (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  prefetch
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                    active ? "bg-purple-400/15 text-purple-950 dark:bg-purple-300/10 dark:text-purple-50" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}

                  {active ? <span className="size-1.5 rounded-full bg-purple-500 dark:bg-purple-300" /> : null}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
