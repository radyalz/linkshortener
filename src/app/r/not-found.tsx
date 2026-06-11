import { RouteNotFoundState } from "@/components/layout/routeNotFoundState";

export default function RedirectNotFound() {
  return (
    <RouteNotFoundState
      title="Short link not found"
      description="This short link route does not exist. Check the URL and try again."
      primaryHref="/"
      primaryLabel="Go home"
      secondaryHref="/dashboard"
      secondaryLabel="Open dashboard"
    />
  );
}