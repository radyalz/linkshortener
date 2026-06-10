import { Skeleton } from "@/components/ui/skeleton";

export function HeaderSkeleton() {
  return (
    <div className="sticky top-0 z-20 px-0 py-4">
      <div className="pointer-events-none absolute inset-0 h-28 bg-[linear-gradient(#ffffff33,#ffffff26,#ffffff00)] backdrop-blur-lg mask-[linear-gradient(#ffffff,#ffffffb3_55%,#ffffff00)] dark:bg-[linear-gradient(#000,#000000b3,#0000)] dark:backdrop-blur-lg dark:mask-[linear-gradient(#000,#000000b3_65%,#0000)]" />

      <header className="glass-panel relative z-10 mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-md">
        <Skeleton className="h-6 w-28 rounded-md" />

        <div className="relative hidden rounded-lg border border-border/60 bg-muted/40 p-1 md:flex">
          <Skeleton className="h-8 w-48 rounded-lg" />
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Skeleton className="size-8 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </header>
    </div>
  );
}
