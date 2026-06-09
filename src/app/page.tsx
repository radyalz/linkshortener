import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">Short Link Manager</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="mx-auto max-w-xl text-muted-foreground">Create short links, track clicks, and manage your URLs from a clean dashboard.</p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/signup">Get started</Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/login">Log in</Link>
            </Button>

            <Button asChild variant="secondary">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
