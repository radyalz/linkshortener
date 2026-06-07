"use client";

import { Button } from "@/components/ui/button";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Dashboard error</h1>
        <p className="text-muted-foreground">Could not load your dashboard.</p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
