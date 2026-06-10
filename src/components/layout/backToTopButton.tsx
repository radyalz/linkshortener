"use client";

import { ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackToTopButtonProps = {
  className?: string;
};

export function BackToTopButton({ className }: BackToTopButtonProps) {
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={cn("flex justify-center pt-16", className)}>
      <Button
        type="button"
        variant="ghost"
        onClick={scrollToTop}
        className="group h-auto rounded-full border border-amber-500/20 bg-background/70 px-4 py-2 text-sm font-medium text-amber-900 shadow-2xl shadow-amber-950/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-amber-400/15 hover:text-amber-950 dark:text-amber-100 dark:hover:text-amber-50"
      >
        <span className="relative mr-2 flex size-7 items-center justify-center rounded-full bg-amber-400/15">
          <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />

          <span className="absolute inset-0 rounded-full border border-amber-400/30 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />
        </span>
        Back to top
      </Button>
    </div>
  );
}
