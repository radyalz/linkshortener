import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/lib/actions/auth";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Logged in as {session.user.email}</p>
        </div>

        <form action={signOutAction}>
          <Button type="submit" variant="outline">
            Log out
          </Button>
        </form>
      </div>
    </main>
  );
}
