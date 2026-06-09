"use client";

import { Button } from "@/components/ui/button";

export default function RootError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>

        <p className="text-muted-foreground">The app could not load correctly.</p>

        <Button onClick={reset}>Try again</Button>
      </div>
    </main>
  );
}
