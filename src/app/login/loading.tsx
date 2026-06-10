import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4">
        <Skeleton className="h-12 w-2/3 rounded-xl" />
        <Skeleton className="h-107.5 w-full rounded-2xl" />
      </div>
    </main>
  );
}