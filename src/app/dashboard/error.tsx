"use client";

import { RouteErrorState } from "@/components/layout/routeErrorState";

export default function DashboardError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Could not load dashboard"
      description="Something went wrong while loading your links and dashboard data."
      reset={reset}
      backHref="/"
      backLabel="Go home"
    />
  );
}