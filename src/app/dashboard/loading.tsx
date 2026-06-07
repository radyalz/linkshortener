import { Skeleton } from "@/components/ui/skeleton";

export default function LoginLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Skeleton className="h-[360px] w-full max-w-md rounded-xl" />
    </main>
  );
}
