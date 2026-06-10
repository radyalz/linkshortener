import Link from "next/link";
import { redirect } from "next/navigation";

import { CopyButton } from "@/components/links/copy-button";
import { CreateLinkForm } from "@/components/links/create-link-form";
import { DeleteLinkDialog } from "@/components/links/delete-link-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth/server";
import { getLinksByUserId } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/authentication");
  }

  const links = await getLinksByUserId(session.user.id);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 pt-6">
        <section>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Create, manage, and track your short links.</p>
        </section>

        <CreateLinkForm />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your links</h2>

          {links.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">You do not have any short links yet. Create your first one above.</CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {links.map((link) => (
                <Card key={link.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{link.title ?? link.slug}</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Slug:</span> /r/{link.slug}
                    </p>

                    <p className="break-all">
                      <span className="font-medium">Destination:</span> {link.destinationUrl}
                    </p>

                    <p>
                      <span className="font-medium">Clicks:</span> {link.clickCount}
                    </p>

                    <p className="text-muted-foreground">Created: {link.createdAt.toLocaleDateString()}</p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <CopyButton value={`${appUrl}/r/${link.slug}`} />

                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/links/${link.id}`}>Details</Link>
                      </Button>

                      <DeleteLinkDialog linkId={link.id} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
