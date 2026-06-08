"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function ShortLinkError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="max-w-md space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Redirect failed</h1>

        <p className="text-muted-foreground">
          Something went wrong while opening this short link.
        </p>

        <div className="flex justify-center gap-3">
          <Button onClick={reset}>Try again</Button>

          <Button asChild variant="outline">
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}