import { Skeleton } from "@/components/ui/skeleton";

export default function RootLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="mx-auto h-10 w-72" />
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    </main>
  );
}
