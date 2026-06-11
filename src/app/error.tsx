"use client";

import { RouteErrorState } from "@/components/layout/routeErrorState";

export default function RootError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Something went wrong"
      description="The app could not load correctly."
      reset={reset}
      backHref="/"
      backLabel="Go home"
    />
  );
}