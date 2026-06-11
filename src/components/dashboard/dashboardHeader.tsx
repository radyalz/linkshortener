import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/10 via-background to-purple-500/10 p-6 shadow-2xl shadow-amber-950/5 dark:from-amber-300/10 dark:via-background dark:to-purple-400/10">
      <div className="absolute right-6 top-6 size-24 rounded-full bg-amber-400/20 blur-3xl" />
      <div className="absolute bottom-0 left-10 size-20 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative space-y-3">
        <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-800 dark:border-amber-300/30 dark:text-amber-100">
          Link dashboard
        </Badge>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Dashboard</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">Create, manage, copy, and track your short links from one clean workspace.</p>
        </div>
      </div>
    </section>
  );
}
