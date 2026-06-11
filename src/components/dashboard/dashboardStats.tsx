import { BarChart3, Link2, MousePointerClick } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type DashboardStatsProps = {
  totalLinks: number;
  totalClicks: number;
};

export function DashboardStats({ totalLinks, totalClicks }: DashboardStatsProps) {
  const averageClicks = totalLinks === 0 ? 0 : Math.round(totalClicks / totalLinks);

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <StatCard label="Total links" value={totalLinks} icon={<Link2 className="size-4" />} />
      <StatCard label="Total clicks" value={totalClicks} icon={<MousePointerClick className="size-4" />} />
      <StatCard label="Avg. clicks" value={averageClicks} icon={<BarChart3 className="size-4" />} />
    </section>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="border-amber-500/10 bg-card/80 shadow-sm shadow-black/5 dark:bg-white/[0.04]">
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
          <p lang="eng" className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
        </div>

        <div className="flex size-10 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-200">{icon}</div>
      </CardContent>
    </Card>
  );
}
