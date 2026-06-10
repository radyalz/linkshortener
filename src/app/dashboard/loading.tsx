import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <main className="min-h-screen px-6 pb-20">
      <div className="mx-auto max-w-5xl space-y-8 pt-6">
        <section className="space-y-2">
          <Skeleton className="h-10 w-56 rounded-lg" />
          <Skeleton className="h-5 w-80 rounded-lg" />
        </section>

        <Skeleton className="h-64 w-full rounded-2xl" />

        <section className="space-y-4">
          <Skeleton className="h-8 w-36 rounded-lg" />

          <div className="grid gap-4">
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
            <Skeleton className="h-40 w-full rounded-2xl" />
          </div>
        </section>
      </div>
    </main>
  );
}
