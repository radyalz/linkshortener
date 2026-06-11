import { Skeleton } from "@/components/ui/skeleton";

type RouteLoadingStateProps = {
  variant: "home" | "auth" | "dashboard" | "detail" | "redirect";
};

export function RouteLoadingState({ variant }: RouteLoadingStateProps) {
  if (variant === "home") {
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

  if (variant === "auth") {
    return (
      <main className="flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-10 w-56 rounded-xl" />
          <Skeleton className="h-[430px] w-full rounded-2xl" />
        </div>
      </main>
    );
  }

  if (variant === "dashboard") {
    return (
      <main className="min-h-screen px-6 pb-20">
        <div className="mx-auto max-w-6xl space-y-8 pt-6">
          <Skeleton className="h-40 w-full rounded-2xl" />

          <div className="grid gap-3 sm:grid-cols-3">
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>

          <Skeleton className="h-72 w-full rounded-2xl" />

          <section className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <Skeleton className="h-8 w-36 rounded-lg" />
                <Skeleton className="h-5 w-80 rounded-lg" />
              </div>

              <Skeleton className="h-10 w-36 rounded-lg" />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Skeleton className="h-52 w-full rounded-2xl" />
              <Skeleton className="h-52 w-full rounded-2xl" />
              <Skeleton className="h-52 w-full rounded-2xl" />
              <Skeleton className="h-52 w-full rounded-2xl" />
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (variant === "detail") {
    return (
      <main className="min-h-screen p-6">
        <div className="mx-auto max-w-5xl space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-10 w-64 rounded-lg" />
              <Skeleton className="h-5 w-80 rounded-lg" />
            </div>

            <Skeleton className="h-10 w-40 rounded-lg" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Skeleton className="h-36 w-full rounded-2xl" />
            <Skeleton className="h-36 w-full rounded-2xl md:col-span-2" />
          </div>

          <Skeleton className="h-36 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <Skeleton className="mx-auto size-12 rounded-full" />
        <Skeleton className="mx-auto h-7 w-56 rounded-lg" />
        <Skeleton className="mx-auto h-5 w-72 rounded-lg" />
      </div>
    </main>
  );
}
