import { redirect } from "next/navigation";

import { CreateLinkForm } from "@/components/links/create-link-form";
import { DashboardHeader } from "@/components/dashboard/dashboardHeader";
import { DashboardStats } from "@/components/dashboard/dashboardStats";
import { LinksGrid } from "@/components/dashboard/linksGrid";
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

  const totalClicks = links.reduce((sum, link) => sum + link.clickCount, 0);

  return (
    <main className="min-h-screen pb-20">
      <div className="mx-auto max-w-6xl space-y-8 px-6 pt-6">
        <DashboardHeader />
        <DashboardStats totalLinks={links.length} totalClicks={totalClicks} />
        <CreateLinkForm />
        <LinksGrid links={links} appUrl={appUrl} />
      </div>
    </main>
  );
}