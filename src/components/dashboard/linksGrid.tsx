"use client";

import Link from "next/link";
import { CalendarDays, Grid2X2, List, MousePointerClick } from "lucide-react";
import { useState } from "react";

import { EmptyLinksState } from "@/components/dashboard/emptyLinksState";
import { LinkCard } from "@/components/dashboard/linkCard";
import { CopyButton } from "@/components/links/copy-button";
import { DeleteLinkDialog } from "@/components/links/delete-link-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type Link as ShortLink } from "@/lib/db/schema";

type ViewMode = "cards" | "table";

type LinksGridProps = {
  links: ShortLink[];
  appUrl: string;
};

export function LinksGrid({ links, appUrl }: LinksGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  if (links.length === 0) {
    return (
      <section className="space-y-4">
        <LinksSectionHeader viewMode={viewMode} onViewModeChange={setViewMode} disabled />
        <EmptyLinksState />
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <LinksSectionHeader viewMode={viewMode} onViewModeChange={setViewMode} />

      {viewMode === "cards" ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} appUrl={appUrl} />
          ))}
        </div>
      ) : (
        <LinksTable links={links} appUrl={appUrl} />
      )}
    </section>
  );
}

function LinksSectionHeader({ viewMode, onViewModeChange, disabled }: { viewMode: ViewMode; onViewModeChange: (viewMode: ViewMode) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Your links</h2>
        <p className="mt-1 text-sm text-muted-foreground">Switch between card and table view depending on how you want to scan your links.</p>
      </div>

      <div className="inline-flex w-fit rounded-[4px] border border-border bg-background/70 p-1 shadow-sm dark:bg-white/[0.04]">
        <Button
          type="button"
          size="sm"
          variant={viewMode === "cards" ? "default" : "ghost"}
          disabled={disabled}
          onClick={() => onViewModeChange("cards")}
          className={cn("rounded-[3px]", viewMode === "cards" && "bg-amber-500 text-black hover:bg-amber-400")}
        >
          <Grid2X2 className="size-4" />
          Cards
        </Button>

        <Button
          type="button"
          size="sm"
          variant={viewMode === "table" ? "default" : "ghost"}
          disabled={disabled}
          onClick={() => onViewModeChange("table")}
          className={cn("rounded-[3px]", viewMode === "table" && "bg-amber-500 text-black hover:bg-amber-400")}
        >
          <List className="size-4" />
          Table
        </Button>
      </div>
    </div>
  );
}

function LinksTable({ links, appUrl }: { links: ShortLink[]; appUrl: string }) {
  return (
    <Card className="border-amber-500/10 bg-card/90 shadow-sm shadow-black/5 dark:bg-white/[0.04]">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-4">Link</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="pr-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {links.map((link) => {
              const shortUrl = `${appUrl}/r/${link.slug}`;

              return (
                <TableRow key={link.id} className="hover:bg-amber-500/[0.04] dark:hover:bg-amber-300/[0.06]">
                  <TableCell className="max-w-[220px] pl-4">
                    <div className="space-y-1">
                      <Link href={`/dashboard/links/${link.id}`} className="block truncate font-medium hover:text-amber-700 hover:underline dark:hover:text-amber-300">
                        {link.title || "Untitled link"}
                      </Link>

                      <Link href={`/r/${link.slug}`} target="_blank" className="block truncate text-xs text-amber-700 hover:underline dark:text-amber-300">
                        /r/{link.slug}
                      </Link>
                    </div>
                  </TableCell>

                  <TableCell className="max-w-[320px]">
                    <p className="truncate text-muted-foreground">{link.destinationUrl}</p>
                  </TableCell>

                  <TableCell className="text-right">
                    <Badge variant="outline" className="gap-1 border-amber-500/20 bg-amber-500/10 text-amber-800 dark:text-amber-100">
                      <MousePointerClick className="size-3" />
                      {link.clickCount.toLocaleString()}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      {link.createdAt.toLocaleDateString()}
                    </span>
                  </TableCell>

                  <TableCell className="pr-4">
                    <div className="flex justify-end gap-2">
                      <CopyButton value={shortUrl} />

                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/links/${link.id}`}>Details</Link>
                      </Button>

                      <DeleteLinkDialog linkId={link.id} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
