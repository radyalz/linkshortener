import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ClicksChart } from "@/components/links/clicks-chart";
import { CopyButton } from "@/components/links/copy-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth/server";
import { getClicksPerDayForLastSevenDays, getLinkByIdForUser } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

type LinkDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LinkDetailPage({ params }: LinkDetailPageProps) {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/authentication");
  }

  const { id } = await params;

  const link = await getLinkByIdForUser(id, session.user.id);

  if (!link) {
    notFound();
  }

  const clicksData = await getClicksPerDayForLastSevenDays(link.id);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const shortUrl = `${appUrl}/r/${link.slug}`;

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{link.title ?? link.slug}</h1>

            <p className="text-muted-foreground">Link details and recent click activity.</p>
          </div>

          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total clicks</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">{link.clickCount}</p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Short URL</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="break-all text-sm text-muted-foreground">{shortUrl}</p>

              <CopyButton value={shortUrl} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Destination</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="break-all text-sm">{link.destinationUrl}</p>

            <p className="text-sm text-muted-foreground">Created: {link.createdAt.toLocaleDateString()}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clicks per day</CardTitle>
          </CardHeader>

          <CardContent>
            <ClicksChart data={clicksData} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
