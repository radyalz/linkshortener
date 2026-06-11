"use client";

import { RouteErrorState } from "@/components/layout/routeErrorState";

export default function DashboardLinksError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Could not load link pages"
      description="Something went wrong while loading the link management route."
      reset={reset}
      backHref="/dashboard"
      backLabel="Back to dashboard"
    />
  );
}