import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <main className="min-h-screen px-6 pb-20">
      <section className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl items-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Skeleton className="h-9 w-64 rounded-full" />

            <div className="space-y-3">
              <Skeleton className="h-16 w-full max-w-2xl rounded-xl" />
              <Skeleton className="h-16 w-4/5 max-w-xl rounded-xl" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-full max-w-xl rounded-lg" />
              <Skeleton className="h-6 w-3/4 max-w-lg rounded-lg" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Skeleton className="h-11 w-44 rounded-lg" />
              <Skeleton className="h-11 w-28 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-105 w-full rounded-2xl" />
        </div>
      </section>
    </main>
  );
}
