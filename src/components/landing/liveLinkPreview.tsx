import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LiveLinkPreview() {
  return (
    <Card variant="glass" className="reveal-on-load reveal-delay-2 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl">Live link preview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="rounded-xl border border-purple-500/15 bg-white/55 p-4 dark:border-white/10 dark:bg-black/20">
          <p className="text-sm text-muted-foreground">Short URL</p>

          <p className="mt-1 break-all text-lg font-medium text-amber-800 dark:text-amber-100">https://localhost:3000/r/RadmanAlizadeh</p>
        </div>

        <div className="rounded-xl border border-purple-500/15 bg-white/55 p-4 dark:border-white/10 dark:bg-black/20">
          <p className="text-sm text-muted-foreground">Destination</p>

          <p className="mt-1 break-all text-sm">https://radyalz.com/very/long/product/campaign/link</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-purple-500/15 bg-purple-500/10 p-4 dark:border-white/10 dark:bg-purple-500/10">
            <p className="text-sm text-muted-foreground">Clicks</p>

            <p className="mt-2 text-3xl font-bold">128</p>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-amber-400/15 p-4 dark:border-white/10 dark:bg-amber-500/10">
            <p className="text-sm text-muted-foreground">Status</p>

            <p className="mt-2 text-lg font-semibold text-amber-800 dark:text-amber-100">Active</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
