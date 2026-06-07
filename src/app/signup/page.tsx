import { redirect } from "next/navigation";

import { SignUpForm } from "@/components/auth/sign-up-form";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  const { data: session } = await auth.getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <SignUpForm />
    </main>
  );
}
