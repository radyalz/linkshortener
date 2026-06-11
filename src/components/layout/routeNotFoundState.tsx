import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type RouteNotFoundStateProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function RouteNotFoundState({ title, description, primaryHref = "/", primaryLabel = "Go home", secondaryHref, secondaryLabel }: RouteNotFoundStateProps) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md border-amber-500/20 bg-card/90 text-center shadow-2xl shadow-amber-950/5 dark:bg-white/[0.04]">
        <CardContent className="space-y-6 p-6">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/10 text-2xl font-bold text-amber-800 dark:text-amber-100">404</div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-sm leading-6 text-muted-foreground">{description}</p>
          </div>

          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button asChild>
              <Link href={primaryHref}>{primaryLabel}</Link>
            </Button>

            {secondaryHref && secondaryLabel ? (
              <Button asChild variant="outline">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
