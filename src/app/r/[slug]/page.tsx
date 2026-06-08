import { notFound, redirect } from "next/navigation";

import { getLinkBySlug, recordClick } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

type RedirectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { slug } = await params;

  const link = await getLinkBySlug(slug);

  if (!link) {
    notFound();
  }

  await recordClick(link.id);

  redirect(link.destinationUrl);
}