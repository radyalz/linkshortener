"use client";

import { RouteErrorState } from "@/components/layout/routeErrorState";

export default function AuthenticationError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Could not load authentication"
      description="Something went wrong while opening the authentication wizard."
      reset={reset}
      backHref="/"
      backLabel="Go home"
    />
  );
}