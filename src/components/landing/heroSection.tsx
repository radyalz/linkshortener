import Link from "next/link";

import { LiveLinkPreview } from "@/components/landing/liveLinkPreview";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  createLinkHref: string;
};

export function HeroSection({ createLinkHref }: HeroSectionProps) {
  return (
    <section className="mx-auto flex min-h-[calc(100dvh-160px)] max-w-6xl items-start py-14">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <h1 className="reveal-on-load reveal-delay-1 max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
            Short links with <span className="gold-gradient-text">golden clarity</span> and real click tracking.
          </h1>

          <p className="reveal-on-load reveal-delay-2 max-w-2xl text-lg leading-8 text-muted-foreground">
            Create clean short URLs, redirect visitors, track click counts, and manage everything from a polished authenticated dashboard.
          </p>

          <div className="reveal-on-load reveal-delay-3 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link href={createLinkHref}>Create your first link</Link>
            </Button>
          </div>
        </div>

        <LiveLinkPreview />
      </div>
    </section>
  );
}
