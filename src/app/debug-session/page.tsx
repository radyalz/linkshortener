import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function DebugSessionPage() {
  const { data: session, error } = await auth.getSession();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Debug Session</h1>

      <pre className="mt-4 overflow-auto rounded-lg border p-4 text-sm">
        {JSON.stringify(
          {
            hasSession: Boolean(session),
            user: session?.user
              ? {
                  id: session.user.id,
                  email: session.user.email,
                  name: session.user.name,
                }
              : null,
            error: error ? error.message : null,
          },
          null,
          2,
        )}
      </pre>
    </main>
  );
}