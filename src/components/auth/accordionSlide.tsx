import { type ReactNode } from "react";

export function AccordionSlide({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div
      className={
        open
          ? "grid grid-rows-[1fr] opacity-100 transition-[grid-template-rows,opacity] duration-300 ease-out"
          : "grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out"
      }
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
