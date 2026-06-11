import Link from "next/link";
import { CalendarDays, ExternalLink, MousePointerClick } from "lucide-react";

import { CopyButton } from "@/components/links/copy-button";
import { DeleteLinkDialog } from "@/components/links/delete-link-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Link as ShortLink } from "@/lib/db/schema";

type LinkCardProps = {
  link: ShortLink;
  appUrl: string;
};

export function LinkCard({ link, appUrl }: LinkCardProps) {
  const shortUrl = `${appUrl}/r/${link.slug}`;

  return (
    <Card className="border-amber-500/10 bg-card/90 shadow-sm shadow-black/5 transition-all hover:-translate-y-0.5 hover:border-amber-500/25 hover:shadow-lg hover:shadow-amber-950/5 dark:bg-white/[0.04] dark:hover:bg-white/[0.06]">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <CardTitle className="truncate text-lg">{link.title || "Untitled link"}</CardTitle>

            <Link href={`/r/${link.slug}`} target="_blank" className="inline-flex max-w-full items-center gap-1 truncate text-sm font-medium text-amber-700 hover:underline dark:text-amber-300">
              <span className="truncate">/r/{link.slug}</span>
              <ExternalLink className="size-3.5 shrink-0" />
            </Link>
          </div>

          <Badge variant="outline" className="shrink-0 border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-100">
            {link.clickCount.toLocaleString()} clicks
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="line-clamp-2 break-all rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm text-muted-foreground">{link.destinationUrl}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <MousePointerClick className="size-3.5" />
            {link.clickCount.toLocaleString()} total clicks
          </span>

          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-3.5" />
            {link.createdAt.toLocaleDateString()}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <CopyButton value={shortUrl} />

          <Button asChild variant="outline" size="sm">
            <Link href={`/dashboard/links/${link.id}`}>Details</Link>
          </Button>

          <DeleteLinkDialog linkId={link.id} />
        </div>
      </CardContent>
    </Card>
  );
}
