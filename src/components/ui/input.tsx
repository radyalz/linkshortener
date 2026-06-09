import * as React from "react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  variant = "glass",
  ...props
}: React.ComponentProps<"input"> & {
  variant?: "default" | "glass";
}) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        variant === "default" && "border-input bg-transparent dark:bg-input/30 dark:disabled:bg-input/80",
        variant === "glass" && "border-white/10 bg-white/5 text-foreground placeholder:text-muted-foreground/70 backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
