"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type RouteErrorStateProps = {
  title: string;
  description: string;
  reset: () => void;
  backHref?: string;
  backLabel?: string;
};

export function RouteErrorState({ title, description, reset, backHref, backLabel = "Go back" }: RouteErrorStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md border-destructive/20 bg-card/90 text-center shadow-2xl shadow-destructive/5 dark:bg-white/[0.04]">
        <CardContent className="space-y-5 p-6">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-destructive/20 bg-destructive/10 text-lg font-bold text-destructive">!</div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          </div>

          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button onClick={reset}>Try again</Button>

            {backHref ? (
              <Button asChild variant="outline">
                <Link href={backHref}>{backLabel}</Link>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
