import { RouteNotFoundState } from "@/components/layout/routeNotFoundState";

export default function DashboardLinksNotFound() {
  return (
    <RouteNotFoundState
      title="Link page not found"
      description="The link management page you requested could not be found."
      primaryHref="/dashboard"
      primaryLabel="Back to dashboard"
      secondaryHref="/"
      secondaryLabel="Go home"
    />
  );
}