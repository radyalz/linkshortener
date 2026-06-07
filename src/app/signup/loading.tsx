import { Skeleton } from "@/components/ui/skeleton";

export default function SignUpLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Skeleton className="h-[420px] w-full max-w-md rounded-xl" />
    </main>
  );
}
