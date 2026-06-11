"use client";

import { RouteErrorState } from "@/components/layout/routeErrorState";

export default function RedirectRouteError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Redirect failed"
      description="Something went wrong while opening this short link route."
      reset={reset}
      backHref="/"
      backLabel="Go home"
    />
  );
}