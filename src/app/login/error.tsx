"use client";

import { RouteErrorState } from "@/components/layout/routeErrorState";

export default function LoginError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <RouteErrorState
      title="Could not load login"
      description="Something went wrong while redirecting to the authentication wizard."
      reset={reset}
      backHref="/authentication"
      backLabel="Open authentication"
    />
  );
}